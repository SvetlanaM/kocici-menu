import { APP_NAME } from '../utils/constants';
import Link from 'next/link';
import Header from '../components/Head';
import getTitle from '../utils/getTitle';

const GDPRConditions = (): JSX.Element => {
  return (
    <>
      <Header title={getTitle('Zásady ochrany osobních údajů')} />
      <div className="w-full flex items-start py-10 xl-custom:py-16 px-10 xl-custom:px-20 flex-col xl-custom:min-h-screen text-purple">
        <Link href="/">
          <a className="logo font-logo font-bold text-lg uppercase text-purple-dark">
            {APP_NAME}
          </a>
        </Link>
        <h2 className="font-bold text-lg my-3">
          Zásady ochrany osobních údajů
        </h2>
        <div className="pb-6">
          <p className="font-bold mb-3 uppercase">
            1. Kdo je správcem Vašich osobních údajů?
          </p>
          <ol>
            <li>
              1.1. Správcem Vašich osobních údajů je společnost Nanooq IT s. r.
              o. a Vaše osobní údaje bude zpracovávat dle níže uvedených
              podmínek.
            </li>
          </ol>
        </div>
        <div className="pb-6">
          <p className="font-bold mb-3 uppercase">
            2. Jaké Vaše osobní údaje budeme zpracovávat?
          </p>
          <ol>
            <li>
              2.1. Osobními údaji se rozumí informace o Vás, na základě kterých
              Vás lze přímo či nepřímo identifikovat. Nanooq IT s. r. o.
              zpracovává pouze osobní údaje, které nám poskytujete v souvislosti
              s využíváním našich služeb.
            </li>
            <li>
              2.2. Nejčastěji se jedná o údaje, které nám poskytnete v rámci
              registrace k naší službě a pro její plné využití:
              <ul className="my-2">
                <li>- email;</li>
              </ul>
            </li>
            <li>
              2.3. Rovněž se jedná o údaje, které získáváme, když používáte naše
              služby, a to:
              <ul className="my-2">
                <li>
                  - podrobnosti o tom, jakým způsobem jste naši službu použili;
                </li>
                <li>- IP adresa;</li>
                <li>
                  - a případně jiný online identifikátor (např. přihlašovací
                  údaje).
                </li>
              </ul>
            </li>
            <li>
              2.4. Citlivé údaje, kterými se rozumí informace o Vás vypovídající
              o národnostním, rasovém nebo etnickém původu, politických
              postojích, členství v odborových organizacích, náboženství a
              filozofickém přesvědčení, odsouzení za trestný čin, zdravotním
              stavu a sexuálním životě subjektu údajů a genetický údaj subjektu
              údajů, nebo jakýkoli biometrický údaj, který umožňuje přímou
              identifikaci nebo autentizaci subjektu údajů, po Vás nepožadujeme
              a nejste povinni je poskytnout. Pokud tak učiníte, resp.
              poskytnete nám jakékoliv citlivé údaje, činíte tak dobrovolně dle
              vlastního uvážení.
            </li>
          </ol>
        </div>
        <div className="pb-6">
          <p className="font-bold mb-3 uppercase">
            3. Pro jaké účely budeme Vaše osobní údaje zpracovávat, na základě
            čeho je budeme zpracovávat a můžeme je zpracovávat i bez Vašeho
            souhlasu?
          </p>
          <ol>
            <li>
              3.1. Hlavními účely, proč zpracováváme Vaše osobní údaje, jsou:
              <ul className="my-2">
                <li>
                  - abyste mohli plně využívat služeb, o které jste projevili
                  zájem;
                </li>
                <li>
                  - abychom mohli spravovat Vaše uživatelské účty - jedná se o
                  osobní údaje, které nám poskytnete a které získáváme, když
                  používáte naše služby;
                </li>
                <li>
                  - abychom mohli zajistit a neustále zlepšovat funkčnost a
                  bezpečnost Webových stránek a služeb na nich poskytovaných,
                  včetně zajištění bezpečnosti Vašich osobních údajů – jedná se
                  o osobní údaje, které získáváme, když používáte naše služby.
                </li>
              </ul>
            </li>
            <li>
              3.2. Vaše osobní údaje dále zpracováváme pro následujícími účely:
              <ul className="my-2">
                <li>
                  - zlepšování kvality našich služeb, jejich obsahu a vývoje
                  nových - jedná se o osobní údaje, které získáváme, když
                  používáte naše služby;
                </li>
                <li>
                  - ochrana našich práv – jedná se o osobní údaje, které nám
                  poskytnete a které získáváme, když používáte naše služby;
                </li>
                <li>
                  - a k statistickým účelům (v této souvislosti jsou Vaše údaje
                  obvykle agregovány tak, že nelze určit Vaši totožnost) – jedná
                  se o osobní údaje, které získáváme, když používáte naše
                  služby.
                </li>
              </ul>
            </li>
            <li>
              3.3. Vaše osobní údaje můžeme zpracovávat, buď na základě Vámi
              uděleného souhlasu, dále například také na základě našeho
              oprávněného zájmu či pro splnění mezi námi uzavřené smlouvy, a to
              v rozsahu osobních údajů, které jsou k takovému splnění nezbytné.
            </li>
            <li>
              3.4. Pokud zpracováváme Vaše osobní údaje na základě Vašeho
              souhlasu, toto zpracování není nezbytně nutné k plnění smlouvy
              nebo zákonných povinností či ochrany oprávněných zájmů Nanooq IT
              s. r. o., ale jejich zpracování nám umožní Vás blíže informovat o
              nabídkách, pokud naše služby plně nevyužíváte, případně se i
              zaměřit lépe na to, co Vás zajímá a informovat Vás o nabídkách,
              které jsou pro Vás výhodné. Tyto osobní údaje jsou zpracovávány v
              případě udělení souhlasu a mohou být zpracovány po dobu platnosti
              tohoto souhlasu (tím není dotčena zákonnost zpracování
              vycházejícího ze souhlasu, který byl dán před jeho odvoláním).
              Jedná se o:
              <ul className="my-2">
                <li>
                  - zpracování Vašich osobních údajů pro účely zasílání
                  výhodných nabídek produktů a služeb Prima Digital či třetích
                  stran (zejména veřejných či skrytých slevových akcí). Rozsah
                  zpracovávaných osobních údajů je uveden přímo v textu
                  souhlasu.;
                </li>
              </ul>
            </li>
          </ol>
        </div>
        <div className="pb-6">
          <p className="font-bold mb-3 uppercase">
            4. Po jakou dobu budeme Vaše osobní údaje zpracovávat?
          </p>
          <ol>
            <li>
              4.1. Vaše osobní údaje budeme zpracovávat pouze po nezbytně nutnou
              dobu potřebnou k účelům jejich zpracování. Průběžně prověřujeme,
              zda nadále trvá potřeba zpracovávat určité osobní údaje potřebné
              pro určitý účel a pokud zjistíme, že již nejsou potřebné pro žádný
              z účelů, pro který byly zpracovávány, Vaše osobní údaje
              zlikvidujeme či anonymizujeme. Základní lhůty pro zpracování
              osobních údajů jsou uvedeny níže.
            </li>
            <li>
              4.2. Vaše osobní údaje potřebné pro využívání našich služeb budeme
              zpracovávat po dobu nezbytnou k výkonu práv a povinností mezi Vámi
              a Nanooq IT s. r. o. a uplatňování nároků z těchto smluvních
              vztahů (tj. po dobu 24 měsíců po ukončení smluvního vztahu mezi
              námi). Vaše osobní údaje zpracovávané na základě Vašeho souhlasu
              budou zpracovávány po dobu trvání smluvního vztahu mezi námi a
              dále 12 měsíců poté nebo do doby, dokud jej neodvoláte.
            </li>
          </ol>
        </div>
        <div className="pb-6">
          <p className="font-bold mb-3 uppercase">
            5. Jak vaše osobní údaje zabezpečujeme a komu dalšímu mohou být Vaše
            osobní údaje předány?
          </p>
          <ol>
            <li>
              5.1. Vaše osobní údaje jsou u nás v bezpečí, kdy ochrana Vašich
              dat je naší prioritou a Vaše osobní údaje shromažďujeme a
              uchováváme v zabezpečené databázi na cloudovej službě
              <a href="https://www.netlify.com/" target="new">
                Netlify
              </a>
              , kde jsou chráněny v maximální možné míře pomocí dostupných
              moderních technologií. Berete rovněž na vědomí, že Nanooq IT s. r.
              o. vynaloží maximální úsilí, aby nedošlo k neoprávněnému
              zpracování Vašich osobních údajů, nicméně Nanooq IT s. r. o.
              nenese odpovědnost za případné neoprávněné zásahy třetích osob, v
              jejichž důsledku tyto osoby neoprávněně získají přístup k Vašim
              osobním údajům a/nebo k Vašemu profilu. V této souvislosti Vás
              nicméně ubezpečujeme, že pravidelně kontrolujeme, zda náš systém
              neobsahuje slabá místa a nebyl vystaven útoku a používáme taková
              bezpečností opatření, aby, pokud možno, nedošlo k neoprávněnému
              přístupu k Vašim osobním údajům, a která s ohledem na aktuální
              stav technologií poskytují dostatečné zabezpečení a tato opatření
              rovněž pravidelně aktualizujeme.
            </li>
            <li>
              5.2. Vaše osobní údaje jsou zpřístupněny zaměstnancům Nanooq IT s.
              r. o. a dalším spolupracovníkům v souvislosti s plněním jejich
              pracovních povinností, při kterých je nutné nakládat s Vašimi
              osobními údaji, vždy však pouze v rozsahu, který je v příslušném
              případě nezbytný a za dodržení patřičných bezpečnostních opatření
              a standardů ochrany osobních údajů.
            </li>
            <li>
              5.3. Vaše osobní údaje nebudou dále předávány žádným dalším osobám
              s výjimkou případů, kdy, za určitých přesně definovaných podmínek,
              jsme povinni Vaše osobní údaje předat na základě platných právních
              předpisů (např. Policii ČR, příslušných orgánům státní správy,
              soudům apod.).
            </li>
          </ol>
        </div>
        <div className="pb-6">
          <p className="font-bold mb-3 uppercase">
            6. Jaká máte práva ve vztahu k Vašim osobním údajům?
          </p>
          <ol>
            <li>
              6.1. Velmi si vážíme Vaší důvěry a klademe rovněž nemalý důraz na
              práva, která máte ve vztahu k námi prováděnému zpracování Vašich
              osobních údajů. Pokud budeme mít pochybnosti o Vaší totožnosti,
              můžeme Vás nejprve požádat o poskytnutí dodatečných informací
              nezbytných k potvrzení Vaší totožnosti, než přistoupíme k řešení
              Vaší žádosti týkající se výkonu některého z Vašich práv.
            </li>
            <li>
              6.2. Mezi tato Vaše práva patří zejména:
              <ul className="my-2">
                <li>- právo na přístup k osobním údajům;</li>
                <li>- právo na opravu osobních údajů;</li>
                <li>- právo na výmaz osobních údajů;</li>
                <li>- právo na omezení zpracování osobních údajů;</li>
                <li>- právo na přenositelnost osobních údajů;</li>
                <li>- právo vznést námitku proti zpracování osobních údajů;</li>
                <li>- právo odvolat souhlas se zpracováním osobních údajů;</li>
                <li>- právo podat stížnost proti zpracování osobních údajů.</li>
              </ul>
            </li>
            <li>
              6.3. Kontaktní údaje Poskytovatele jsou:
              <ul className="my-3">
                <li>
                  - adresa pro poštovní doručování: Rybná 24, Praha 1, Staré
                  Město, PSČ 110 00
                </li>
                <li>
                  - adresa pro online komunikaci:{' '}
                  <a href="mailto:svetlana@margetova.eu">
                    svetlana@margetova.eu
                  </a>
                  .
                </li>
              </ul>
            </li>
            <li>6.4. Tyto Podmínky nabývají účinnosti dne 09. 09. 2021.</li>
          </ol>
        </div>
      </div>
    </>
  );
};

export default GDPRConditions;
