// Module Scope
import extend = require('extend');
import mongoose = require('mongoose');

let counterSchema: mongoose.Schema;
let IdentityCounter: mongoose.Model<any>;

// Initialize plugin by creating counter collection in database.
export function initialize(connection: mongoose.Connection) {
  try {
    IdentityCounter = connection.model('IdentityCounter');
  } catch (ex) {
    if (ex.name === 'MissingSchemaError') {
      // Create new counter schema.
      counterSchema = new mongoose.Schema({
        count: { type: Number, default: 0 },
        field: { type: String, require: true },
        model: { type: String, require: true },
      });

      // Create a unique index using the "field" and "model" fields.
      counterSchema.index({ field: 1, model: 1 }, { unique: true });

      // Create model using new schema.
      IdentityCounter = connection.model('IdentityCounter', counterSchema);
    } else {
      throw ex;
    }
  }
}

// The function to use when invoking the plugin on a custom schema.
export function plugin(schema: mongoose.Schema, options: string|object) {
  // If we don't have reference to the counterSchema or the IdentityCounter model
  // then the plugin was most likely not
  // initialized properly so throw an error.
  if (!counterSchema || !IdentityCounter) {
    throw new Error('mongoose-auto-increment has not been initialized');
  }

  // Default settings and plugin scope variables.
  const settings = {
    field: '_id', // The field the plugin should track.
    incrementBy: 1, // The number by which to increment the count each time.
    model: null as any, // The model to configure the plugin for.
    startAt: 0, // The number the count should start at.
    unique: true, // Should we create a unique index for the field
  };
  // A hash of fields to add properties to in Mongoose.
  const fields: any = {};
  // True if the counter collection has been updated and the document is ready to be saved.
  let ready = false;

  /* eslint default-case:'off' */
  switch (typeof options) {
    // If string, the user chose to pass in just the model name.
    case 'string':
      settings.model = options;
      break;
    // If object, the user passed in a hash of options.
    case 'object':
      extend(settings, options);
      break;
  }

  if (settings.model == null) {
    throw new Error('model must be set');
  }

  // Add properties for field in schema.
  fields[settings.field] = {
    require: true,
    type: Number,
  };

  if (settings.field !== '_id') {
    fields[settings.field].unique = settings.unique;
  }
  schema.add(fields);

  // Find the counter for this model and the relevant field.
  IdentityCounter.findOne(
    { model: settings.model, field: settings.field },
    (err, counter) => {
      if (!counter) {
        // If no counter exists then create one and save it.
        /* eslint no-param-reassign:'off' */
        counter = new IdentityCounter({
          count: settings.startAt - settings.incrementBy,
          field: settings.field,
          model: settings.model,
        });
        counter.save(() => {
          ready = true;
        });
      } else {
        ready = true;
      }
    },
  );

  // Declare a function to get the next counter for the model/schema.
  const nextCount = function fnextCount(callback: any) {
    IdentityCounter.findOne({
      field: settings.field,
      model: settings.model,
    }, (err, counter) => {
      if (err) {
        return callback(err);
      }

      return callback(
        null,
        counter === null ? settings.startAt : counter.count + settings.incrementBy,
      );
    });
  };
  // Add nextCount as both a method on documents and a static on the schema for convenience.
  schema.method('nextCount', nextCount);
  schema.static('nextCount', nextCount);

  // Declare a function to reset counter at the start value - increment value.
  const resetCount = function fresetCount(callback: any) {
    IdentityCounter.findOneAndUpdate(
      { model: settings.model, field: settings.field },
      { count: settings.startAt - settings.incrementBy },
      { new: true }, // new: true specifies that the callback should get the updated counter.
      (err) => {
        if (err) {
          return callback(err);
        }
        return callback(null, settings.startAt);
      },
    );
  };
  // Add resetCount as both a method on documents and a static on the schema for convenience.
  schema.method('resetCount', resetCount);
  schema.static('resetCount', resetCount);

  // Every time documents in this schema are saved, run this logic.
  schema.pre('save', function preSave(next) {
    // Get reference to the document being saved.
    const doc = this;

    // Only do this if it is a new document (see http://mongoosejs.com/docs/api.html#document_Document-isNew)
    if (doc.isNew) {
      // Declare self-invoking save function.

      /* eslint wrap-iife: "off" */
      (function save() {
        // If ready, run increment logic.
        // Note: ready is true when an existing counter collection is found or after it is created for the
        // first time.
        if (ready) {
          // check that a number has already been provided, and update the counter to that number if it is
          // greater than the current count
          if (typeof doc[settings.field] === 'number') {
            IdentityCounter.findOneAndUpdate(
              // IdentityCounter documents are identified by the model and field that the plugin was invoked for.
              // Check also that count is less than field value.
              { model: settings.model, field: settings.field, count: { $lt: doc[settings.field] } },
              // Change the count of the value found to the new field value.
              { count: doc[settings.field] },
              (err) => {
                if (err) {
                  return next(err);
                }
                // Continue with default document save functionality.
                next();
              },
            );
          } else {
            // Find the counter collection entry for this model and field and update it.
            IdentityCounter.findOneAndUpdate(
              // IdentityCounter documents are identified by the model and field that the plugin was invoked for.
              { model: settings.model, field: settings.field },
              // Increment the count by `incrementBy`.
              { $inc: { count: settings.incrementBy } },
              // new:true specifies that the callback should get the counter AFTER it is updated (incremented).
              { new: true },
              // Receive the updated counter.
              (err, updatedIdentityCounter) => {
                if (err) {
                  return next(err);
                }
                // If there are no errors then go ahead and set the document's field to the current count.
                doc[settings.field] = updatedIdentityCounter.count;
                // Continue with default document save functionality.
                next();
              },
            );
          }
        } else {
          // If not ready then set a 5 millisecond timer and try to save again. It will keep doing this until
          // the counter collection is ready.
          setTimeout(save, 5);
        }
      })();
    } else {
    // If the document does not have the field we're interested in
    // or that field isn't a number AND the user did
    // not specify that we should increment on updates,
    // then just continue the save without any increment logic.
      next();
    }
  });
}
