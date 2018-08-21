import { TL1Client } from "@felipebergamin/tl1-fiberhome";

import debug = require("../debug");

let fhService: FiberhomeService;

export class FiberhomeService {

  public static async instance(): Promise<FiberhomeService> {
    if (!fhService) {
      try {
        fhService = new FiberhomeService();
        const { TL1_IP, TL1_USER, TL1_PASSWD } = process.env;

        fhService.tl1Client = new TL1Client(TL1_IP, 3337);
        await fhService.tl1Client.connect();

        fhService.tl1Client.login(TL1_USER, TL1_PASSWD)
          .subscribe(
            loginResult => {
              if (loginResult.completion_code.includes('COMPLD')) {
                debug('Login TL1 OK');

                // intervalo para handshake
                setInterval(() => {
                  fhService.tl1Client.handshake().subscribe(
                    handshakeR => debug('Handshake TL1 %s', handshakeR.completion_code),
                  );
                }, FiberhomeService.HANDSHAKE_INTERVAL);

                process.on('SIGINT', () => {
                  fhService.tl1Client.logout()
                    .subscribe(logout => {
                      debug('TL1 Logout %s', logout.completion_code);
                      fhService.tl1Client.disconnect();
                    });
                })
              }
            }
          );

      } catch (err) {
        throw err;
      }
    }

    return fhService;
  }

  private static HANDSHAKE_INTERVAL = 1000 * 60 * (+process.env.TL1_HANDSHAKE_INTERVAL);
  public tl1Client: TL1Client;

  /* public async getOnuOpticalInfo(olt: string, slot: string | number, pon: string | number, onumac: string) {
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
  } */
}
