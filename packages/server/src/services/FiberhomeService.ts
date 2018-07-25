import { TL1Client } from "node-tl1-fiberhome";

import debug = require("../debug");

let fhService: FiberhomeService;

export class FiberhomeService {

  public static async instance(): Promise<FiberhomeService> {
    if (!fhService) {
      try {
        fhService = new FiberhomeService();
        const { TL1_IP, TL1_USER, TL1_PASSWD } = process.env;

        fhService.tl1 = new TL1Client(TL1_IP, 3337);
        await fhService.tl1.connect();
        const loginResponse = await fhService.tl1.login(TL1_USER, TL1_PASSWD);

        if (loginResponse.parsedResponse.completion_code.includes("COMPLD")) {
          debug("conexão TL1 estabelecida");

          setInterval(() => {
            fhService.tl1.handShake();
          }, FiberhomeService.HANDSHAKE_INTERVAL);

          process.on('SIGINT', () => {
            debug("SIGINT: fechando conexão TL1");
            fhService.tl1.logout()
              .then(fhService.tl1.end)
              .catch(fhService.tl1.end);
          });
        }
      } catch (err) {
        throw err;
      }
    }

    return fhService;
  }

  private static HANDSHAKE_INTERVAL = 1000 * 60 * (+process.env.TL1_HANDSHAKE_INTERVAL);
  private tl1: TL1Client;

  public async getOnuOpticalInfo(olt: string, slot: string | number, pon: string | number, onumac: string) {
    return await this.tl1.lstOpticalModuleDDM({
      OLTID: olt,
      ONUID: onumac,
      ONUIDTYPE: "MAC",
      PONID: `NA-NA-${slot}-${pon}`,
    });
  }

  public async getUnauthOnu(olt: string) {
    return await this.tl1.lstUnregisteredOnu({
      OLTID: olt,
    });
  }

  public async addOnu(NAME: string, OLTID: string, ONUID: string,
                      ONUTYPE: string, SLOTNO: number, PONNO: number) {

    return await this.tl1.addOnu({
      AUTHTYPE: "MAC",
      NAME,
      OLTID,
      ONUID,
      ONUTYPE,
      PONID: `NA-NA-${SLOTNO}-${PONNO}`,
    });
  }

  public async configureOnu(OLTID: string, ONUID: string, ONUPORT: string,
                            PONID: string, PVID: number, VLANMOD: string) {

    return await this.tl1.configureLanPort({
      OLTID,
      ONUID,
      ONUIDTYPE: "MAC",
      ONUPORT,
      PONID,
      PVID,
      VLANMOD,
    });
  }
}
