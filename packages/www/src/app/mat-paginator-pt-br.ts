import { MatPaginatorIntl } from '@angular/material';

export class MatPaginatorIntlPtBr extends MatPaginatorIntl {
  itemsPerPageLabel = 'Itens/Página';
  nextPageLabel = 'Próxima';
  previousPageLabel = 'Anterior';
  firstPageLabel = 'Primeira Página';
  lastPageLabel = 'Última Página';

  getRangeLabel = function (page, pageSize, length) {
    if (length === 0 || pageSize === 0) {
      return '0 de ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;

    return `Exibindo ${startIndex + 1} - ${endIndex} (total de ${length})`;
    // return startIndex + 1 + ' - ' + endIndex + ' de ' + length;
  };
}
