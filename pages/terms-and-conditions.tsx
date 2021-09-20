import { APP_NAME } from '../utils/constants';
import Link from 'next/link';
import Header from '../components/Head';
import getTitle from '../utils/getTitle';

const TermsAndConditions = (): JSX.Element => {
  return (
    <>
      <Header title={getTitle('Podmienky používania')} />
      <div className="w-full flex items-start py-16 px-10 xl-custom:px-20 flex-col xl-custom:min-h-screen text-purple">
        <Link href="/user/register">
          <a className="font-logo font-bold text-lg uppercase text-purple-dark">
            {APP_NAME}
          </a>
        </Link>
        <h2 className="font-bold text-lg my-3">Podmínky užití</h2>
        <div className="pb-6">
          <p className="font-bold mb-3">1. ÚVODNÍ USTANOVENÍ</p>
          <ol>
            <li>
              1.1. Tyto podmínky užití (dále jen „Podmínky“) upravují vzájemná
              práva a povinnosti smluvních stran.
            </li>
            <li>
              1.2. Pojmy s velkými počátečními písmeny definované v Podmínkách
              budou mít význam, jenž je jim v Podmínkách připisován. Pro
              zajištění jednotného výkladu pojmů používaných v rámci Podmínek je
              rovněž definován následující slovníček pojmů:
              <ul className="pt-2">
                <li>
                  - <b>E-mailem uživatele</b> se rozumí emailová adresa
                  Uživatele uvedená v Profilu;
                </li>
                <li>
                  - <b>Osobními údaji</b> se rozumí informace o Uživateli, na
                  základě kterých lze Uživatele přímo či nepřímo identifikovat;
                </li>
                <li>
                  - <b>Profilem</b> se rozumí uživatelský profil každého
                  Uživatele, který je přístupný Uživateli na Webovém rozhraní po
                  zadání Přístupových údajů.
                </li>
                <li>
                  - <b>Přístupovými údaji</b> se rozumí unikátní (jedinečné)
                  údaje každého Uživatele, a to E-mail uživatele a heslo pro
                  přístup k Profilu.
                </li>
                <li>
                  - <b>Uživatelem</b> se rozumí každá fyzická osoba, která
                  provede řádně registraci vedoucí k uzavření Smlouvy a je tak
                  oprávněna využívat Službu.
                </li>
                <li>
                  - <b>Webovým rozhraním</b> se rozumí webové rozhraní umístěné
                  na internetové (webové) adrese;
                </li>
              </ul>
            </li>
          </ol>
        </div>
        <div className="pb-6">
          <p className="font-bold mb-3">
            2. REGISTRACE, UŽIVATELSKÝ ÚČET A UZAVŘENÍ SMLOUVY
          </p>
          <ol>
            <li>
              2.1. Provedení registrace Uživatele na Webovém rozhraní je nutnou
              podmínkou pro řádné využívání Služby Uživatelem. Jedna fyzická
              osoba je oprávněna se registrovat pouze jednou a zároveň
              Poskytovatel umožnuje takové fyzické osobě uvést pouze jeden
              E-mail uživatele.
            </li>
            <li>
              2.2. Registrace se provádí vyplněním registračního formuláře na
              Webovém rozhraní;
            </li>
            <li>
              2.3. Registrace Uživatele je zahájena odesláním vyplněného
              registračního formuláře Uživatelem v rámci Webového rozhraní,
              přičemž údaje Uživatele obsažené v odeslaném registračním
              formuláři jsou Poskytovatelem považovány za správné.
            </li>
            <li>
              2.4. Smluvní vztah vzniká (Smlouva je uzavřena) registrací
              Uživatele.
            </li>
          </ol>
        </div>
        <div className="pb-6">
          <p className="font-bold mb-3">
            3. PODMÍNKY VYUŽÍVÁNÍ SLUŽBY, PRÁVA A POVINNOSTI, OBSAH SLUŽBY
          </p>
          <ol>
            <li>
              3.1. Uživatel je povinen zabezpečit technické prostředí s
              odpovídajícími technickými parametry umožňujícími mu bezproblémový
              chod Služby na straně Uživatele, přičemž pro přístup k Službě je
              Uživatel povinen využívat pouze rozhraní poskytnutá mu za tímto
              účelem Poskytovatelem.
            </li>
            <li>
              3.2. Uživatel je povinen chránit své Přístupové údaje pro
              přihlášení Uživatele do Profilu a pro přístup k Službě před
              zneužitím Třetí osobou.
            </li>
            <li>
              3.3. Uživatel nese veškerou odpovědnost za dopad svého jednání
              spojeného s užíváním Služby a výslovně souhlasí s tím, že Službu
              nebude používat k žádným aktivitám, které jsou nebo by mohly být v
              rozporu s platnými právními předpisy.
            </li>
            <li>
              3.4. Poskytovatel vynaloží maximální úsilí, aby veškeré informace
              uvedené v datech byly aktuální a odpovídaly skutečnosti a je
              oprávněn bez jakéhokoliv předchozího oznámení informace obsažené v
              datech jednostranně doplňovat, měnit či odstraňovat.
            </li>
          </ol>
        </div>
        <div className="pb-6">
          <p className="font-bold mb-3">4. PODMÍNKY UŽÍVÁNÍ PORTÁLU</p>
          <ol>
            <li>
              4.1. Celý obsah přístupný na Webovém rozhraní, obsah Služby, jakož
              i webový obsah, který se Službou souvisí a všechny na ni
              publikované materiály (zejména texty, šablony, fotografie, loga,
              obrázky, videa atd.), včetně programového vybavení Webového
              rozhraní, je chráněn autorským právem Poskytovatele a může být
              rovněž chráněn i právy Třetích osob. Uživatel není oprávněn obsah
              dle předchozí věty Podmínek jakkoliv upravovat, měnit, kopírovat,
              šířit, rozmnožovat či používat k jakémukoliv účelu bez předchozího
              písemného souhlasu Poskytovatele.
            </li>
            <li>
              4.2. Uživatel bere na vědomí a uzavřením Smlouvy souhlasí, že
              veškeré hodnocení vkládá bez nároku na jakoukoliv odměnu, jsou
              veřejné, nikoliv soukromé. Poskytovatel neodpovídá za pravdivost
              informací v nich obsažených a za soulad těchto informací s
              právními předpisy.
            </li>
          </ol>
        </div>
        <div className="pb-6">
          <p className="font-bold mb-3">5. VYLOUČENÍ ODPOVĚDNOSTI</p>
          <ol>
            <li>
              5.1. Poskytovatel neodpovídá Uživateli za jakoukoliv přímou či
              nepřímou újmu či škodu, která Uživateli vznikne v souvislosti s
              používáním Portálu.
            </li>
            <li>
              5.2. Poskytovatel dále neodpovídá Uživateli za úplnost, správnost
              a pravdivost informací uvedených na webe a tudíž neodpovídá
              Uživateli za jakoukoliv přímou či nepřímou újmu či škodu, která
              Uživateli v souvislosti s tím vznikne, zejména neodpovídá
              Uživateli za jakoukoliv přímou či nepřímou újmu či škodu
              způsobenou neúplností, nepřesností, nepravdivostí či neaktuálností
              jakékoliv informace uvedené na webe.
            </li>
            <li>
              5.3. Kliknutím na odkazy na webe může dojít k jeho opuštění a k
              přesměrování na jiné weby. Ve vztahu k jiným webům nenese
              Poskytovatel žádnou odpovědnost a neodpovídá Uživateli za
              jakoukoli přímou či nepřímou újmu či škodu v souvislosti s nimi
              vzniklou. Poskytovatel doporučuje Uživateli seznámit se s
              podmínkami používání, obchodními či jinými podmínkami
              provozovatelů takových webových stránek třetích subjektů.
            </li>
          </ol>
        </div>
        <div className="pb-6">
          <p className="font-bold mb-3">6. ZÁVĚREČNÁ USTANOVENÍ</p>
          <ol>
            <li>
              6.1. Veškeré právní vztahy Smlouvou výslovně neupravené se řídí
              českým právním řádem, zejména OZ a právními předpisy
              souvisejícími, a to i pro případ, že právní vztah založený
              Smlouvou obsahuje mezinárodní (zahraniční) prvek. Pro řešení
              jakýchkoliv sporů ze Smlouvy nebo v souvislosti s ní jsou
              příslušné soudy České republiky.
            </li>
            <li>
              6.2. Souhlasem s Podmínkami uděluje Uživatel Poskytovateli rovněž
              souhlas s převodem práv a povinností Poskytovatele ze Smlouvy
              třetí osobě ve smyslu § 1895 a násl. OZ.
            </li>
            <li>
              6.3. Znění Podmínek může Poskytovatel jednostranně měnit či
              doplňovat, přičemž Podmínky jsou pro Uživatele platné vždy v
              aktuálním znění na Webovém rozhraní ke dni uzavření Smlouvy. V
              případě již uzavřených Smluv oznámí Poskytovatel Uživateli změnu
              Podmínek na Webovém rozhraní, případně jiným vhodným způsobem tak,
              aby se s aktuálním zněním Podmínek mohl Uživatel bez nepřiměřených
              potíží seznámit.
            </li>
            <li>
              6.4. Kontaktní údaje Poskytovatele jsou:
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
            <li>6.5. Tyto Podmínky nabývají účinnosti dne 09. 09. 2021.</li>
          </ol>
        </div>
      </div>
    </>
  );
};

export default TermsAndConditions;
