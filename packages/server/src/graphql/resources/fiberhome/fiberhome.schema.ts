export const fiberhomeTypes = `
  type SinalONU {
    ONUID: String
    RxPower: String
    RxPowerR: String
    TxPower: String
    TxPowerR: String
    CurrTxBias: String
    CurrTxBiasR: String
    Temperature: String
    TemperatureR: String
    Voltage: String
    VoltageR: String
    PTxPower: String
    PRxPower: String
  }
`;

export const fiberhomeQueries = `
  consultarSinalONUPA(pontoAcesso: Int!): SinalONU
`;

export const fiberhomeMutations = ``;
