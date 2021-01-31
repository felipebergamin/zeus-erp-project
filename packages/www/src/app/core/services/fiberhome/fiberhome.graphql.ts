import gql from 'graphql-tag';

export interface SinalONUQuery {
  consultarSinalONUPA: SinalOnu;
}

export interface SinalOnu {
  ONUID?: string;
  RxPower?: string;
  RxPowerR?: string;
  TxPower?: string;
  TxPowerR?: string;
  CurrTxBias?: string;
  CurrTxBiasR?: string;
  Temperature?: string;
  TemperatureR?: string;
  Voltage?: string;
  VoltageR?: string;
  PTxPower?: string;
  PRxPower?: string;
}

export const SINAL_ONU_QUERY = gql`
  query consultarONU($pontoAcesso: Int!) {
    consultarSinalONUPA(pontoAcesso: $pontoAcesso) {
      RxPower
      RxPowerR
      TxPower
      TxPowerR
      CurrTxBias
      CurrTxBiasR
      Temperature
      TemperatureR
      Voltage
      VoltageR
      PTxPower
      PRxPower
    }
  }
`;
