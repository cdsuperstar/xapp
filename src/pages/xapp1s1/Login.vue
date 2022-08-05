<template>
  <q-page class="flex flex-center">
    <q-card
      square
      :flat="!$q.screen.gt.xs ? true : false"
      style="width: 400px; padding: 50px"
    >
      <q-card-section>
        <div class="row text-h6 text-primary text-weight-bold no-wrap">
          <q-icon
            name="stop"
            :class="$auth.check() ? 'text-secondary' : 'text-warning'"
            style="font-size: 32px"
          />
          <label class="text-pink">
            {{ $t("auth.login.login") }}
          </label>
        </div>
      </q-card-section>

      <q-card-section>
        <q-input
          id="email"
          v-model.trim="data.data.username"
          type="email"
          required
          autofocus
          :label="this.$t('auth.login.email')"
          :error="this.v$.data.data.username.$error"
          :error-message="this.$t('auth.errors.email')"
          @blur="this.v$.data.data.username.$touch"
        />
        <q-input
          id="password"
          v-model="data.data.password"
          required
          :type="isPwd ? 'password' : 'text'"
          :label="this.$t('auth.login.password')"
          :error="this.v$.data.data.password.$error"
          :error-message="this.$t('auth.errors.password')"
          @blur="this.v$.data.data.password.$touch"
        >
          <template v-slot:append>
            <q-icon
              color="accent"
              class="cursor-pointer"
              :name="isPwd ? 'visibility_off' : 'visibility'"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <div class="q-px-sm" style="padding-right: 10px">
          <q-checkbox
            color="pink"
            id="rememberMe"
            v-model="data.rememberMe"
            :label="this.$t('auth.login.remember_me')"
          />
        </div>
        <div class="q-px-sm">
          <q-checkbox v-model="agree" color="pink" />
          {{ $t("xapp1s1.login.treaty1") }}
          <label
            class="text-pink"
            @click="showUserAgreement = !showUserAgreement"
          >
            {{ $t("xapp1s1.login.userAgreement") }}
          </label>
          {{ $t("xapp1s1.login.treaty2") }}
        </div>

        <q-dialog v-model="showUserAgreement">
          <q-card>
            <q-card-section>
              <div class="text-h6">
                {{ $t("xapp1s1.login.userAgreement") }}
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section class="q-pt-none scroll" style="max-height: 50vh">
              1、特别提示 1.1
              力扣同意按照本协议的规定及其不时发布的操作规则提供基于互联网的相关服务(以下称“网络服务”)，为获得网络服务，服务使用人(以下称“用户”)同意本协议的全部条款并按照页面上的提示完成全部的注册程序。用户在进行注册程序过程中点击“同意”按钮即表示用户完全接受本协议项下的全部条款。这些条款可由力扣随时更新，本服务协议一旦发生变动，力扣将会在相关的页面上提示修改内容。修改后的服务协议一旦在页面上公布即有效代替原来的服务协议。用户在使用力扣提供的各项服务之前，应仔细阅读本服务协议，如用户不同意本服务协议及/或随时对其的修改，请停止使用力扣提供的产品、服务。
              2、服务内容 2.1
              使用力扣相关服务，可以通过预装、力扣已授权的第三方下载等方式获取“力扣”客户端应用程序或访问
              leetcode-cn.com
              网站。若用户并非从力扣或经力扣授权的第三方获取“力扣”客户端应用程序或网站的，力扣无法保证非官方版本的“力扣”客户端应用程序或网站能够正常使用，用户因此遭受的损失与力扣无关。
              2.2
              力扣网络服务的具体内容由力扣根据实际情况提供。力扣保留随时变更、中断或终止部分或全部网络服务的权利。
              2.3
              力扣在提供网络服务时，可能会对部分网络服务的用户收取一定的费用。在此情况下，力扣会在相关页面上做明确的提示。如用户不同意支付该等费用，则可不接受相关的网络服务。
              2.4
              用户理解：力扣仅提供相关的网络服务，除此之外与相关网络服务有关的设备(如电脑、调制解调器及其他与接入互联网有关的装置)及所需的费用(如为接入互联网而支付的电话费及上网费)均应由用户自行负担。
              2.5 会员服务：您可以通过阅读我们的 会员服务协议 了解更多信息。
              3、使用规则 3.1
              用户注册成功后，力扣将提供每个用户一个用户帐号，该用户帐号和密码由用户负责保管；用户应当对以其用户帐号进行的所有活动和事件负法律责任。
              3.2
              用户理解并承诺，用户所设置的账号不得违反国家法律法规及力扣的相关规则，用户的账号名称、头像和简介等注册信息及其他个人信息中不得出现违法信息、不良信息，未经他人许可不得用他人名义（包括但不限于冒用他人姓名、名称、字号、头像等足以让人引起混淆的方式）开设账号，不得恶意注册账号（包括但不限于频繁注册、批量注册账号等行为）。用户在账号注册及使用过程中需遵守相关法律法规，不得实施任何侵害国家利益、损害其他公民合法权益，有害社会道德风尚的行为。力扣有权对用户提交的信息进行审核。
              3.3
              用户同意接受力扣通过电子邮件或其他方式向用户发送的商品促销或其他相关商业信息。
              3.4
              用户应当对使用“力扣”及相关服务的行为负责，在使用力扣产品服务过程中，必须遵循以下原则：
              (1). 遵守中国有关的法律和法规； (2).
              不得为任何非法目的而使用网络服务系统； (3).
              遵守所有与网络服务有关的网络协议、规定和程序； (4).
              不得利用力扣网络服务系统进行任何可能对互联网的正常运转造成不利影响的行为；
              (5).
              不得利用力扣网络服务系统传输任何骚扰性的、中伤他人的、辱骂性的、恐吓性的、庸俗淫秽的或其他任何非法的信息资料；
              (6).
              除非得到力扣事先书面授权，用户不得以任何形式对“力扣”及相关服务进行包括但不限于改编、复制、传播、垂直搜索、镜像或交易等未经授权的访问或使用。
              (7).
              不得使用未经力扣授权或许可的任何插件、外挂、系统或第三方工具对“力扣”及相关服务的正常运行进行干扰、破坏、修改或施加其他影响。
              (8).
              严禁企图干涉、破坏“力扣”系统或网站的正常运行，故意传播恶意程序或病毒以及其他破坏干扰正常网络信息服务的行为；
              (9).
              严禁未经许可，企图探查、扫描、测试“力扣”系统或网络的弱点或其它实施破坏网络安全的行为；
              (10).
              严禁未经允许进入公众计算机网络或者他人计算机系统并删除、修改、增加存储信息；
              (11).
              不得对“力扣”及相关服务进行反向工程、反向汇编、编译或者以其他方式尝试发现“力扣”的源代码；
              (12). 严禁伪造 TCP/IP 数据包名称或部分名称； (13).
              不得使用未经许可的数据或进入未经许可的服务器/账号； (14).
              不得利用力扣网络服务系统进行任何不利于力扣的行为； (15).
              就力扣及合作商业伙伴的服务、产品、业务咨询应采取相应机构提供的沟通渠道，不得在公众场合发布有关力扣及相关服务的负面宣传。
              (16).
              如发现任何非法使用用户帐号或帐号出现安全漏洞的情况，应立即告知力扣。
              3.5
              用户使用根据本协议获得的用户帐号和密码登录力扣的网站或接受其他力扣提供的服务项目时，应遵守该网站或服务项目的相关服务协议及使用守则，用户登录上述网站或接受上述服务项目时即视为对相关服务协议及使用守则的接受。
              3.6
              如果力扣有理由认为用户的任何行为违反或可能违反上述约定的，力扣可独立进行判断并处理，且有权在不进行任何事先通知的情况下终止向用户提供服务，并追究相关法律责任。
              3.7
              力扣保留对此部分条款随时增补删除的权利，保留此协议的最终解释权。
              4、信息内容规范 4.1
              力扣致力于提供一个高质量的技术学习平台。力扣鼓励用户创作、发布优质内容，同时也将采取必要措施管理违法、侵权或有其他不良影响的网络信息。
              4.2
              在力扣发布的所有内容将严格依据国务院《中华人民共和国电信条例》、中华人民共和国国家互联网信息办公室
              《网络信息内容生态治理规定》《互联网论坛社区服务管理规定》执行。
              4.3
              力扣可能删除违规内容、断开违规内容链接、暂停或终止违规用户帐号功能等方式，对以下违法、不良信息或存在危害的行为进行处理。
              (1). 反对宪法所确定的基本原则； (2).
              危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一，损害国家荣誉和利益；
              (3).
              侮辱、滥用英烈形象，歪曲、丑化、亵渎、否定英雄烈士事迹和精神，以侮辱、诽谤或者其他方式侵害英雄烈士的姓名、肖像、名誉、荣誉；
              (4). 宣扬恐怖主义、极端主义或者煽动实施恐怖活动、极端主义活动；
              (5). 煽动民族仇恨、民族歧视，破坏民族团结； (6).
              破坏国家宗教政策，宣扬邪教和封建迷信； (7).
              散布谣言，扰乱社会秩序，破坏社会稳定； (8).
              宣扬淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪； (9).
              煽动非法集会、结社、游行、示威、聚众扰乱社会秩序； (10).
              侮辱或者诽谤他人，侵害他人名誉、隐私和其他合法权益； (11).
              含有法律、行政法规禁止的其他内容； (12).
              侵犯他人肖像权、姓名权、名誉权、隐私权或其他人身权利； (13).
              侵害他人著作权、专利权、商标权、商业秘密、或其它专属权利； (14).
              使用带有侮辱性的语言挑衅、辱骂他人； (15).
              煽动人群歧视、地域歧视等，针对他人的民族、种族、宗教、性取向、性别、年龄、地域、生理特征等身份或者归类的攻击；
              (16).
              发布垃圾广告信息：以推广曝光为目的，发布影响用户体验、扰乱力扣秩序的内容；
              (17). 发布大量包含 SEO
              推广链接、产品、品牌等内容获取搜索引擎中的不正当曝光； (18).
              多次发布包含欺骗性外链的内容，如未注明的淘宝客链接、跳转网站等，诱骗用户点击链接；
              (19). 在力扣内容创作区多次发布外部二维码，QQ /
              微信群号、招聘等外链信息，诱导他人关注，严重影响用户体验的； (20).
              使用特殊符号、图片等方式规避垃圾广告内容审核的广告内容； (21).
              发布与评论信息毫无关系的内容； (22).
              发布包含欺骗性的（如冒充他人）、严重影响用户体验的违规手段进行恶意营销；
              (23). 不规范转载，或大篇幅转载他人内容同时加入推广营销内容； (24).
              发布可能存在事实性错误或者造谣等内容； (26). 传播封建迷信内容；
              (27). 可能引发未成年人模仿不安全行为和违反社会公德行为； (28).
              干扰 “力扣” 正常运营或侵犯其他用户或第三方合法权益内容的其他信息；
              (29).
              其他违反法律法规、政策及公序良俗，或可能对网络生态造成不良影响的其他内容；
              (30). 力扣认为不适合力扣平台宗旨或者不适当的内容的。 5、内容所有权
              5.1
              力扣提供的网络服务内容可能包括：文字、软件、声音、图片、录像、图表等。所有这些内容受版权法、商标法和其它财产所有权法律的保护。
              5.2
              用户只有在获得力扣或其他相关权利人的书面授权之后才能使用这些内容，而不能擅自复制、再造这些内容、或创造与内容有关的派生产品。
              5.3
              用户对于其在力扣平台「题解」和「圈子文章」部分发布的内容享有著作权，并授权力扣在世界范围内免费、永久、不可撤销和非独家地使用该著作权包含的财产权；力扣平台上的其它所有内容（包括但不限于用户在力扣平台上提交的代码、「圈子」评论、「LeetCode
              探索」的全部内容）著作权归力扣所有。 5.4
              用户在任何情况下都不得私自使用力扣的包括但不限于商标、服务标记、商号、域名、网站名称或其他显著品牌特征等（以下统称为“标识”）。未经力扣事先书面同意，用户不得将本条款前述标识以单独或结合任何方式展示、使用或申请注册商标、进行域名注册等，也不得实施向他人明示或暗示有权展示、使用、或其他有权处理该些标识的行为。由于用户违反本协议使用力扣上述商标、标识等给力扣或他人造成损失的，由用户承担全部法律责任。
              5.5
              力扣为开发、运营提供技术支持，并对开发、运营等过程中产生的所有数据和信息等享有法律法规允许范围内的全部权利。
              6、隐私保护 6.1
              保护用户（特别是未成年人）的隐私是力扣的一项基本政策，因此，若父母（监护人）希望未成年人（尤其是十四岁以下子女）得以使用本服务，必须以父母（监护人）名义申请注册，在接受本服务时，应以法定监护人身份加以判断本服务是否符合于未成年人。力扣保证不对外公开或向第三方
              （6.2所列情况除外）提供用户注册资料及用户在使用网络服务时存储在力扣的非公开内容，但下列情况除外：
              (1). 事先获得用户的明确授权； (2). 根据有关的法律法规要求； (3).
              按照相关政府主管部门的要求； (4). 为维护社会公众的利益； (5).
              为维力扣的合法权益。 6.2
              用户明确，力扣可能会与第三方合作向用户提供相关的网络服务，在此情况下，如该第三方同意承担与力扣同等的保护用户隐私的责任，则力扣可将用户的注册资料等提供给该第三方。
              6.3
              在不透露单个用户隐私资料的前提下，力扣有权对整个用户数据库进行技术分析并对已进行分析、整理后的用户数据库进行商业上的使用。尽管力扣对用户的隐私权保护做了极大的努力，但是仍然不能保证现有的安全技术措施使用户的技术信息等不受任何形式的损失。
              7、免责声明 7.1 力扣不保证以下事宜： (1). 本服务将符合用户的要求；
              (2). 本服务将不受干扰、及时提供、安全可靠或不会出错。 7.2
              用户明确同意其使用力扣网络服务所存在的风险将完全由其自己承担；因其使用力扣网络服务而产生的一切后果也由其自己承担，力扣对用户不承担任何责任。
              8、服务变更、中断或终止 8.1
              如因系统维护或升级的需要而需暂停网络服务，力扣将尽可能事先进行通告。
              8.2
              如发生下列任何一种情形，力扣有权随时中断或终止向用户提供本协议项下的网络服务而无需通知用户：
              (1). 用户提供的个人资料不真实； (2). 用户违反本协议约定。 8.3
              除前款所述情形外，力扣同时保留在不事先通知用户的情况下随时中断或终止部分或全部网络服务的权利，对于所有服务的中断或终止而造成的任何损失，力扣无需对用户或任何第三方承担任何责任。
              9、广告 9.1
              用户理解并同意，在使用“力扣”及相关服务过程中力扣可能会推送具有相关性的信息、广告发布或品牌推广服务，且力扣将在“力扣”及相关服务中展示“力扣”及相关服务相关和/或第三方供应商、合作伙伴的商业广告、推广或信息（包括商业或非商业信息）。
              9.2
              力扣依照法律规定履行广告及推广相关义务，用户应当自行判断该广告或推广信息的真实性和可靠性并为自己的判断行为负责。除法律法规明确规定外，用户因该广告或推广信息进行的购买、交易或因前述内容遭受的损害或损失由用户自行承担，力扣不予承担责任。
              10、违规行为处理流程 10.1
              如因用户违反有关法律、法规或本协议项下的任何条款而给力扣或任何其他第三人造成损失，用户同意承担由此造成的损害赔偿责任。
              10.2
              力扣将通过官方审核和用户举报两种方式收集违规行为信息。多数情况下力扣团队会对违规用户发出建议、引导和警告，并给予违规用户改正自己不当行为的机会，但不表示力扣团队在采取措施前必须先发出警告。
              10.3
              违法本规定以及影响其他用户体验的行为力扣都会严肃处理。力扣将根据相关用户违规情节严重程度，对内容进行修改、删除，对用户进行下线、账号禁言
              7 天、15 天、30
              天、永久禁言的处罚。当用户通过不正当手段注册、使用帐号，或者滥用多个帐号发布违规内容时，或其它情节恶劣的行为，力扣将加重处罚。
              11、法律管辖 11.1
              本协议的订立、执行和解释及争议的解决均应适用中国法律。 11.2
              如双方就本协议内容或其执行发生任何争议，双方应尽量友好协商解决；协商不成时，任何一方均应向力扣所在地的人民法院提起诉讼。
              12、通知和送达 12.1
              本协议项下所有的通知均可通过重要页面公告、电子邮件或常规的信件传送等方式进行；该等通知于发送之日视为已送达收件人。
              13、其他规定 13.1
              本协议构成双方对本协议之约定事项及其他有关事宜的完整协议。 13.2
              如本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，本协议的其余条款仍应有效并且有约束力。
              13.3 本协议中的标题仅为方便而设，不具法律或契约效果。
            </q-card-section>
            <q-separator />
            <q-card-actions align="right">
              <q-btn
                :label="this.$t('xapp1s1.login.accept')"
                color="primary"
                v-close-popup
                @click="agree = true"
              />
              <q-btn :label="this.$t('xapp1s1.login.cancel')" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
        <q-space />
      </q-card-section>
      <q-card-actions align="center">
        <!--        <q-btn color="primary" :loading="loading" @click="login">-->
        <q-btn
          type="submit"
          color="secondary"
          icon-right="input"
          :loading="submitting"
          @click="login"
        >
          {{ $t("auth.login.login") }}&nbsp;&nbsp;
          <template v-slot:loading>
            <q-spinner-facebook />
          </template>
        </q-btn>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

        <q-btn color="warning" icon-right="how_to_reg" to="register">
          &nbsp;&nbsp;{{ $t("auth.register.register") }} &nbsp;&nbsp;
        </q-btn>
      </q-card-actions>
      <q-inner-loading :showing="loading">
        <q-spinner-gears size="50px" color="secondary" />
      </q-inner-loading>
      <div align="right">
        <br />
        <router-link to="/forgot">
          <a>{{ this.$t("auth.login.password_forgot") }}</a>
        </router-link>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
export default {
  name: "Login",
  components: {},
  data() {
    return {
      agree: false,
      submitting: false,
      showUserAgreement: false,
      isPwd: true,
      data: {
        data: {
          username: "1@1.com",
          password: "12345678",
        },
        rememberMe: false,
        offlinelogin: false,
      },
      loading: false,
    };
  },
  setup: () => ({ v$: useVuelidate() }),
  created() {
    // 加入初始记住的用户信息
    if (this.$q.localStorage.getItem("rememberMe")) {
      this.data.data.username = this.$q.localStorage.getItem("username");
      this.data.data.password = this.$q.localStorage.getItem("password");
      this.data.rememberMe = this.$q.localStorage.getItem("rememberMe");
    }
  },
  methods: {
    login() {
      // 离线登录
      if (this.data.offlinelogin) {
        this.v$.data.$touch();
        if (!this.v$.data.$error) {
          console.log(this.data.data, "------");
          var path =
            cordova.file.externalRootDirectory + "AsmartApp/Login.json";
          var reader = new FileReader();
          reader.readAsText(path);
        }
      } else {
        // 在线登录
        // console.log("logindata", this.data);
        this.submitting = true;
        this.v$.data.$touch();
        if (!this.v$.data.$error) {
          // console.log("Logined:", this.$auth);
          this.loading = true;
          this.$auth
            .login(this.data)
            .then((response) => {
              // console.log("Login res:", response);
              if (this.data.rememberMe) {
                this.$q.localStorage.set("username", this.data.data.username);
                this.$q.localStorage.set("password", this.data.data.password);
              }
              this.$q.localStorage.set("rememberMe", this.data.rememberMe);
              /* eslint-disable */
              if (device.platform === "Android") {
                var path =
                  cordova.file.externalRootDirectory + "AsmartApp/Login.json";
                let tmplogin = [];
                tmplogin.username = this.data.data.username;
                tmplogin.password = md5(this.data.data.password);
                writeFile(path, tmplogin);
              }
              /* eslint-enable */
            })
            .catch((error) => {
              if (error.response) {
                if (error.response.status === 401) {
                  this.$q.dialog({
                    message: this.$t("auth.login.verification_required"),
                  });
                } else if (error.response.status === 403) {
                  this.$q.dialog({
                    message: this.$t("auth.login.invalid_credentials"),
                  });
                } else if (error.response.status === 400) {
                  this.$q.dialog({
                    message: this.$t("auth.login.invalid_credentials"),
                  });
                } else {
                  console.error(error);
                }
              }
            })
            .finally(() => {
              this.submitting = false;
              this.loading = false;
            });
        }
      }
    },
  },
  validations() {
    return {
      data: {
        data: {
          username: {
            required,
            email,
          },
          password: {
            required,
          },
        },
      },
    };
  },
};
</script>
