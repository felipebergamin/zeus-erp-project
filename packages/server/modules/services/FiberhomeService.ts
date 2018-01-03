import { TL1Client } from "node-tl1-fiberhome";
import { LogService as log } from "./LogService";

let fhService: FiberhomeService;

export class FiberhomeService {
  public static instance(): FiberhomeService {
    if (!fhService) {
      fhService = new FiberhomeService();

      fhService.tl1 = new TL1Client("172.16.255.6", 3337, () => {
        fhService.tl1.login("felipe", "fe.li.pe./28")
          .then((login) => {
            log.debug("conexão TL1 estabelecida com sucesso");
            setInterval(() => {
              fhService.tl1.handShake();
            }, FiberhomeService.FIVE_MINUTES_IN_MS);

            process.on('SIGINT', () => {
              fhService.tl1.logout()
                .then(fhService.tl1.end)
                .catch(fhService.tl1.end);
            });
          })
          .catch((err) => {
            log.error(`falha no login do servidor TL1`, JSON.stringify(err));
          });
      });
    }

    return fhService;
  }

  private static FIVE_MINUTES_IN_MS = 5 * 60 * 1000;
  private tl1: TL1Client;

  public async getOnuOpticalInfo(olt: string, slot: string|number, pon: string|number, onumac: string) {
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
