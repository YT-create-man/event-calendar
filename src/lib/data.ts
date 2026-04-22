export const Y_BASE = "yokosuka" as const;
export const K_BASE = "kounandai" as const;
export const DX_BASE = "dxlab" as const;

export type BaseCode = typeof Y_BASE | typeof K_BASE | typeof DX_BASE;
export type EventKind = "regular" | "seminar";
export type EventStatus = "full" | "few" | "open";

export type EventItem = {
  id: string;
  base: BaseCode;
  baseName: string;
  title: string;
  teacher: string;
  subtitle: string;
  time: string;
  kind: EventKind;
  capacity: number;
  booked: number;
  address: string;
  notes: string;
};

type ScheduledEvent = {
  year: number;
  month: number;
  day: number;
  base: BaseCode;
  title: string;
  teacher: string;
  subtitle: string;
  time: string;
  kind: EventKind;
  capacity: number;
  notes?: string;
};

const YOKOSUKA_ADDRESS = "横須賀市大津町1-22-22 SLMC横須賀BASE";
const KOUNANDAI_ADDRESS = "横浜市港南区港南台4-24-2 SLMC港南台BASE";
const DXLAB_ADDRESS = "横浜市港南区港南台4-24-2 SLA港南台校 DXラボ";

const SCHEDULED: ScheduledEvent[] = [
  // 横須賀BASE 2026年5月（毎週 火・土 14:00〜 ※16日のみ13:00〜、定員6名）
  {
    year: 2026, month: 5, day: 2, base: Y_BASE,
    title: "生成AI体験", teacher: "", subtitle: "ChatGPTを使ってみよう！",
    time: "14:00–16:00", kind: "regular", capacity: 6,
  },
  {
    year: 2026, month: 5, day: 5, base: Y_BASE,
    title: "安全講習", teacher: "", subtitle: "PC・スマホを使う際の注意点や活用方法を学ぶ",
    time: "14:00–16:00", kind: "regular", capacity: 6,
  },
  {
    year: 2026, month: 5, day: 9, base: Y_BASE,
    title: "マイクラ", teacher: "", subtitle: "マイクラで楽しくPC操作を学ぼう！目指せエンダードラゴン討伐",
    time: "14:00–16:00", kind: "regular", capacity: 6,
  },
  {
    year: 2026, month: 5, day: 12, base: Y_BASE,
    title: "iPhone基礎講座3", teacher: "", subtitle: "iPhoneの使い方を基礎から（Part1・2未参加も歓迎）",
    time: "14:00–16:00", kind: "regular", capacity: 6,
  },
  {
    year: 2026, month: 5, day: 16, base: Y_BASE,
    title: "認知症予防講座", teacher: "", subtitle: "救命救急のプロから認知症予防のための知識を学ぶ",
    time: "13:00–15:00", kind: "regular", capacity: 6,
  },
  {
    year: 2026, month: 5, day: 19, base: Y_BASE,
    title: "iPhoneで綺麗な写真を撮ろう", teacher: "", subtitle: "iPhoneで綺麗な写真を撮るコツを学ぶ",
    time: "14:00–16:00", kind: "regular", capacity: 6,
  },
  {
    year: 2026, month: 5, day: 23, base: Y_BASE,
    title: "AO入校説明会", teacher: "", subtitle: "デジタルライフプランナー資格のご案内",
    time: "14:00–16:00", kind: "regular", capacity: 6,
  },
  {
    year: 2026, month: 5, day: 26, base: Y_BASE,
    title: "エンディングノート書こう", teacher: "", subtitle: "終活のプロと始め方・書き方を考える",
    time: "14:00–16:00", kind: "regular", capacity: 6,
  },

  // 横須賀BASE 2026年6月（毎週 火・土 14:00〜 ※20日のみ13:00〜、定員6名）
  {
    year: 2026, month: 6, day: 2, base: Y_BASE,
    title: "安全講習", teacher: "", subtitle: "PC・スマホを使う際の注意点や活用方法を学ぶ",
    time: "14:00–16:00", kind: "regular", capacity: 6,
  },
  {
    year: 2026, month: 6, day: 6, base: Y_BASE,
    title: "LINEの使い方講座", teacher: "", subtitle: "LINEの使い方を初歩から学ぶ",
    time: "14:00–16:00", kind: "regular", capacity: 6,
  },
  {
    year: 2026, month: 6, day: 9, base: Y_BASE,
    title: "生成AIをやってみよう", teacher: "", subtitle: "ChatGPTでの画像生成を学ぶ",
    time: "14:00–16:00", kind: "regular", capacity: 6,
  },
  {
    year: 2026, month: 6, day: 13, base: Y_BASE,
    title: "マイクラ", teacher: "", subtitle: "マイクラで楽しくPC操作を学ぼう！目指せエンダードラゴン討伐",
    time: "14:00–16:00", kind: "regular", capacity: 6,
  },
  {
    year: 2026, month: 6, day: 16, base: Y_BASE,
    title: "安心アルバムを作ろう", teacher: "", subtitle: "もしもの場合に備えて個人情報と写真でアルバムを作成",
    time: "14:00–16:00", kind: "regular", capacity: 6,
  },
  {
    year: 2026, month: 6, day: 20, base: Y_BASE,
    title: "認知症予防講座", teacher: "", subtitle: "救命救急のプロから認知症予防のための知識を学ぶ",
    time: "13:00–15:00", kind: "regular", capacity: 6,
  },
  {
    year: 2026, month: 6, day: 23, base: Y_BASE,
    title: "生前整理", teacher: "", subtitle: "デジタル遺品（パスワード・写真）の整理方法を終活のプロから学ぶ",
    time: "14:00–16:00", kind: "regular", capacity: 6,
  },
  {
    year: 2026, month: 6, day: 27, base: Y_BASE,
    title: "AO入校説明会", teacher: "", subtitle: "デジタルライフプランナー資格のご案内",
    time: "14:00–16:00", kind: "regular", capacity: 6,
  },

  // 港南台BASE 2026年5月（SLA港南台校）
  {
    year: 2026, month: 5, day: 7, base: K_BASE,
    title: "Smart Life AO校説明会", teacher: "",
    subtitle: "AO校で何ができる？スマートライフデザイン学とは？どう活用できるかをまるごと説明",
    time: "14:00–16:00", kind: "regular", capacity: 20,
    notes: "参加費：無料／定員20名（増枠可）",
  },
  {
    year: 2026, month: 5, day: 9, base: K_BASE,
    title: "iPhone連係について Part④", teacher: "",
    subtitle: "“なんとなく使っている”iPhoneを安心して使える相棒に。便利な操作・アプリ・連係を確認",
    time: "14:00–16:00", kind: "regular", capacity: 20,
    notes: "参加費：無料／定員20名（増枠可）／基礎講座未参加・④から初参加も歓迎",
  },
  {
    year: 2026, month: 5, day: 14, base: K_BASE,
    title: "生前整理 Part②", teacher: "ものと心の生前整理アドバイザー 鎌滝様",
    subtitle: "“前向きな整理”のPart②。大切なものを整理しながら、すっきり自分らしく過ごす",
    time: "14:00–16:00", kind: "regular", capacity: 15,
    notes: "AO生・CC会員限定／定員15名（増枠可）",
  },
  {
    year: 2026, month: 5, day: 16, base: K_BASE,
    title: "安全講習 〜デジタル詐欺対策〜", teacher: "",
    subtitle: "“2段階認証”や“パスキー”って何？詐欺被害から身を守るために知っておきたいこと",
    time: "14:00–16:00", kind: "regular", capacity: 20,
    notes: "参加費：無料／定員20名（増枠可）",
  },
  {
    year: 2026, month: 5, day: 21, base: K_BASE,
    title: "AI講習 〜GoogleWorkspace編〜", teacher: "",
    subtitle: "話題のAIをGoogleWorkspaceで。日常で役立つAIを一緒に学ぶ",
    time: "14:00–16:00", kind: "regular", capacity: 15,
    notes: "AO生・CC会員限定／定員15名（増枠可）",
  },
  {
    year: 2026, month: 5, day: 28, base: K_BASE,
    title: "スマホの写真を1冊の宝物に Part①", teacher: "写真整理上級アドバイザー 寺尾様",
    subtitle: "スマホに眠る写真を一冊のフォトブックに。全2回で完成を目指す",
    time: "14:00–16:00", kind: "regular", capacity: 15,
    notes: "AO生・CC会員限定／定員15名限定",
  },

  // 港南台BASE 2026年6月（確定分のみ）
  {
    year: 2026, month: 6, day: 11, base: K_BASE,
    title: "パーソナルカラー診断", teacher: "", subtitle: "",
    time: "14:00–16:00", kind: "regular", capacity: 10,
  },

  // 商店主セミナー（特別企画、定員20名）
  {
    year: 2026, month: 5, day: 20, base: Y_BASE,
    title: "商店主セミナー", teacher: "三浦 和夫（商店主会 会長）",
    subtitle: "地域で商いを続けるヒント",
    time: "14:00–16:00", kind: "seminar", capacity: 20,
  },
  {
    year: 2026, month: 6, day: 10, base: Y_BASE,
    title: "商店主セミナー", teacher: "三浦 和夫（商店主会 会長）",
    subtitle: "地域で商いを続けるヒント",
    time: "14:00–16:00", kind: "seminar", capacity: 20,
  },
  {
    year: 2026, month: 6, day: 3, base: K_BASE,
    title: "商店主セミナー", teacher: "長谷川 豊（商店主会 副会長）",
    subtitle: "地域で商いを続けるヒント",
    time: "14:00–16:00", kind: "seminar", capacity: 20,
  },
  {
    year: 2026, month: 6, day: 17, base: K_BASE,
    title: "商店主セミナー", teacher: "長谷川 豊（商店主会 副会長）",
    subtitle: "地域で商いを続けるヒント",
    time: "14:00–16:00", kind: "seminar", capacity: 20,
  },

  // ===== DXラボ（SLA港南台校） 2026年4月〜2027年3月 =====
  // 4月
  { year: 2026, month: 4, day: 4, base: DX_BASE, title: "技術活用講座", teacher: "", subtitle: "パソコン購入後の初期設定〜アカウント作成・Office認証時の注意事項・アップデート確認実施〜", time: "11:00–12:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 4, day: 4, base: DX_BASE, title: "くらしの中のデジタルリテラシー講座", teacher: "", subtitle: "いつもの暮らしとデジタルの今を知ろう！", time: "13:00–14:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 4, day: 11, base: DX_BASE, title: "Google活用講座", teacher: "", subtitle: "Google Gemini 完全活用ガイド 2026 〜旅の計画からビジネスの意思決定まで〜", time: "11:00–12:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 4, day: 11, base: DX_BASE, title: "商店主DX LAB", teacher: "", subtitle: "NotebookLM(Google)で明日使う商談用のプレゼン作成術", time: "13:00–14:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 4, day: 18, base: DX_BASE, title: "Apple活用講座", teacher: "", subtitle: "面倒なことはAppleにお任せ！AIと作る『ラクちん生活』のはじめ方", time: "11:00–12:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 4, day: 18, base: DX_BASE, title: "Canva活用講座", teacher: "", subtitle: "Canvaへようこそ！基本画面と操作ガイド", time: "13:00–14:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 4, day: 25, base: DX_BASE, title: "生成AI活用講座", teacher: "", subtitle: "「毎日の文章作成が一気にラクになる」Geminiを使ったLINE・メール・SNS文章作成術", time: "14:00–15:00", kind: "regular", capacity: 10 },

  // 5月
  { year: 2026, month: 5, day: 2, base: DX_BASE, title: "くらしの中のデジタルリテラシー講座", teacher: "", subtitle: "そのニュース本当ですか？フェイク動画・画像の現在地", time: "13:00–14:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 5, day: 9, base: DX_BASE, title: "Google活用講座", teacher: "", subtitle: "指一本でメモをとる 〜「書く」から「話す」への転換〜", time: "11:00–12:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 5, day: 9, base: DX_BASE, title: "商店主DX LAB", teacher: "", subtitle: "あなたのお店のPOPを作ろう！Genspark・Canva 活用講座", time: "13:00–14:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 5, day: 10, base: DX_BASE, title: "技術活用講座", teacher: "", subtitle: "パソコン・スマホのセキュリティ対策の重要性", time: "13:00–14:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 5, day: 16, base: DX_BASE, title: "Apple活用講座", teacher: "", subtitle: "「日々の健康診断」Apple WatchとiPhoneで便利にできる健康管理術", time: "11:00–12:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 5, day: 16, base: DX_BASE, title: "Canva活用講座", teacher: "", subtitle: "テンプレート活用術 本格デザイン体験", time: "13:00–14:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 5, day: 23, base: DX_BASE, title: "生成AI活用講座", teacher: "", subtitle: "「心を掴むSNS投稿をしてみよう！」広告文・キャッチコピーをGeminiで効率化", time: "11:00–12:00", kind: "regular", capacity: 10 },

  // 6月
  { year: 2026, month: 6, day: 6, base: DX_BASE, title: "技術活用講座", teacher: "", subtitle: "個人個人のアカウント管理の重要性", time: "11:00–12:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 6, day: 6, base: DX_BASE, title: "くらしの中のデジタルリテラシー講座", teacher: "", subtitle: "毎日届くメール・メッセージ本当に安全ですか？", time: "13:00–14:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 6, day: 13, base: DX_BASE, title: "Google活用講座", teacher: "", subtitle: "家族の時を合わせる 〜「言った言わない」をなくすカレンダー〜", time: "11:00–12:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 6, day: 13, base: DX_BASE, title: "商店主DX LAB", teacher: "", subtitle: "Genspark活用術 AIワークスペース講座", time: "13:00–14:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 6, day: 20, base: DX_BASE, title: "Apple活用講座", teacher: "", subtitle: "「劇的効率アップ」：録音・要約・共有 AppleとAIを使ったラクラク課題対策講座", time: "11:00–12:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 6, day: 20, base: DX_BASE, title: "Canva活用講座", teacher: "", subtitle: "文字を入力しよう テキスト入力とフォント選びの基本", time: "13:00–14:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 6, day: 27, base: DX_BASE, title: "生成AI活用講座", teacher: "", subtitle: "「調べ物に時間をかけない」Perplexityで正確な情報を素早くまとめる活用術", time: "11:00–12:00", kind: "regular", capacity: 10 },

  // 7月
  { year: 2026, month: 7, day: 4, base: DX_BASE, title: "技術活用講座", teacher: "", subtitle: "万が一に備えたパソコン・スマホのデータバックアップ", time: "11:00–12:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 7, day: 4, base: DX_BASE, title: "くらしの中のデジタルリテラシー講座", teacher: "", subtitle: "仕事や家庭で使うスマホ・パソコン安全ですか？", time: "13:00–14:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 7, day: 11, base: DX_BASE, title: "Google活用講座", teacher: "", subtitle: "地図を味方につける 〜現在地共有と防災マップ〜", time: "11:00–12:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 7, day: 11, base: DX_BASE, title: "商店主DX LAB", teacher: "", subtitle: "AI(Gemini)にお任せ！売れるキャッチコピー＆商品説明文 自動生成 Instagram投稿講座", time: "13:00–14:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 7, day: 18, base: DX_BASE, title: "Apple活用講座", teacher: "", subtitle: "「AI家庭教師」：Notes×AI要約×ボイスメモによる超速・予習復習術", time: "11:00–12:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 7, day: 18, base: DX_BASE, title: "Canva活用講座", teacher: "", subtitle: "写真とイラストを自由に配置しよう！ 素材の追加と編集術", time: "13:00–14:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 7, day: 25, base: DX_BASE, title: "生成AI活用講座", teacher: "", subtitle: "「資料・PDFが一瞬で分かる」NotebookLMで難しい文章を要約・整理しよう", time: "11:00–12:00", kind: "regular", capacity: 10 },

  // 8月
  { year: 2026, month: 8, day: 1, base: DX_BASE, title: "技術活用講座", teacher: "", subtitle: "お家のインターネット接続・外出先のインターネット接続・職場のインターネット接続は安全？", time: "11:00–12:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 8, day: 1, base: DX_BASE, title: "くらしの中のデジタルリテラシー講座", teacher: "", subtitle: "家での買い物、外での支払い、家族で知るべき利用のルール", time: "13:00–14:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 8, day: 8, base: DX_BASE, title: "Google活用講座", teacher: "", subtitle: "指先で世界旅行へ 〜Google Earthと知的好奇心〜", time: "11:00–12:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 8, day: 8, base: DX_BASE, title: "商店主DX LAB", teacher: "", subtitle: "1分で魅力が伝わる！スマホで撮った動画をPC(Google Vids)で編集するショート動画講座", time: "13:00–14:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 8, day: 15, base: DX_BASE, title: "Apple活用講座", teacher: "", subtitle: "「思い出を楽しく安全に」：AppleとAIで写真の整理と思い出を楽しむ", time: "11:00–12:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 8, day: 15, base: DX_BASE, title: "Canva活用講座", teacher: "", subtitle: "デザインの印象を変える！色と背景の設定", time: "13:00–14:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 8, day: 22, base: DX_BASE, title: "生成AI活用講座", teacher: "", subtitle: "「考えがまとまらないを解消」Geminiでアイデア出しと頭の整理をする実践講座", time: "11:00–12:00", kind: "regular", capacity: 10 },

  // 9月
  { year: 2026, month: 9, day: 5, base: DX_BASE, title: "技術活用講座", teacher: "", subtitle: "パソコンのメモリとは？メモリ増設？交換はできる？", time: "11:00–12:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 9, day: 5, base: DX_BASE, title: "くらしの中のデジタルリテラシー講座", teacher: "", subtitle: "生成AIで作った素材「どこまで使って良い？」", time: "13:00–14:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 9, day: 12, base: DX_BASE, title: "Google活用講座", teacher: "", subtitle: "言葉の壁を超えるレンズ 〜翻訳と画像検索〜", time: "11:00–12:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 9, day: 12, base: DX_BASE, title: "商店主DX LAB", teacher: "", subtitle: "デジタルサイネージ・モニター用の紹介動画作成講座(Norlang・Google vids)", time: "13:00–14:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 9, day: 19, base: DX_BASE, title: "Apple活用講座", teacher: "", subtitle: "「まるで一つのツール」：MacとiPadを使ったマルチタスク促進", time: "11:00–12:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 9, day: 19, base: DX_BASE, title: "Canva活用講座", teacher: "", subtitle: "スッキリ見せる配置のコツ！整列・グループ化・重ね順", time: "13:00–14:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 9, day: 26, base: DX_BASE, title: "生成AI活用講座", teacher: "", subtitle: "「説明が苦手でも大丈夫」NotebookLMで伝わる説明文・まとめ文作成術", time: "11:00–12:00", kind: "regular", capacity: 10 },

  // 10月
  { year: 2026, month: 10, day: 3, base: DX_BASE, title: "技術活用講座", teacher: "", subtitle: "パソコンの容量を増やしたい！ SSD換装や増設って簡単？", time: "11:00–12:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 10, day: 3, base: DX_BASE, title: "くらしの中のデジタルリテラシー講座", teacher: "", subtitle: "SNSでの発信・書き込みとの向き合い方", time: "13:00–14:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 10, day: 10, base: DX_BASE, title: "Google活用講座", teacher: "", subtitle: "思い出を自動で整理する 〜Googleフォトの魔法〜", time: "11:00–12:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 10, day: 10, base: DX_BASE, title: "商店主DX LAB", teacher: "", subtitle: "Gensparkで見積書・請求書作成 事業活用講座", time: "13:00–14:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 10, day: 17, base: DX_BASE, title: "Apple活用講座", teacher: "", subtitle: "「アイディアがどんどん湧いてくる」：AppleとAIで壁打ちとファクトチェックを簡単に", time: "11:00–12:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 10, day: 17, base: DX_BASE, title: "Canva活用講座", teacher: "", subtitle: "Canva AIを使ってみよう アイデアの出し方と広げ方", time: "13:00–14:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 10, day: 24, base: DX_BASE, title: "生成AI活用講座", teacher: "", subtitle: "「イベント・お知らせ文を迷わず作る」Geminiを使った分かりやすい告知文作成講座", time: "11:00–12:00", kind: "regular", capacity: 10 },

  // 11月
  { year: 2026, month: 11, day: 7, base: DX_BASE, title: "技術活用講座", teacher: "", subtitle: "初めての自作パソコン組立・分解・パーツ増設", time: "11:00–12:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 11, day: 7, base: DX_BASE, title: "くらしの中のデジタルリテラシー講座", teacher: "", subtitle: "大切な写真や思い出、やり直しのきかないデータを安全に守るために", time: "13:00–14:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 11, day: 14, base: DX_BASE, title: "Google活用講座", teacher: "", subtitle: "家中の書類をクラウドへ 〜スキャンとペーパーレス整理術〜", time: "11:00–12:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 11, day: 14, base: DX_BASE, title: "商店主DX LAB", teacher: "", subtitle: "商店主個人事業主の方必見、デジタルリテラシー講座", time: "13:00–14:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 11, day: 21, base: DX_BASE, title: "Apple活用講座", teacher: "", subtitle: "「自分という資本を最大化する」Apple Watch×AI×集中モード：データで脳と体を制御する【超・自己管理】実践講座", time: "11:00–12:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 11, day: 21, base: DX_BASE, title: "Canva活用講座", teacher: "", subtitle: "情報を整理して伝えよう 見出し・文字量・レイアウト設計", time: "13:00–14:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 11, day: 28, base: DX_BASE, title: "生成AI活用講座", teacher: "", subtitle: "「学んだ内容を忘れない」NotebookLMで自分専用まとめノートを作る活用術", time: "11:00–12:00", kind: "regular", capacity: 10 },

  // 12月
  { year: 2026, month: 12, day: 5, base: DX_BASE, title: "技術活用講座", teacher: "", subtitle: "パソコン簡易診断〜定期的なメンテナンス実施するべき項目とは？〜", time: "11:00–12:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 12, day: 5, base: DX_BASE, title: "くらしの中のデジタルリテラシー講座", teacher: "", subtitle: "電話や音声が信用できない時代、知っておいて欲しいポイント", time: "13:00–14:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 12, day: 12, base: DX_BASE, title: "Google活用講座", teacher: "", subtitle: "想いをカタチにする 〜Googleスライドでカード作成〜", time: "11:00–12:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 12, day: 12, base: DX_BASE, title: "商店主DX LAB", teacher: "", subtitle: "商店(会社)のWifi が繋がらなくなった！！そんな時の対応・技術講座", time: "13:00–14:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 12, day: 19, base: DX_BASE, title: "Apple活用講座", teacher: "", subtitle: "「見守りも防犯も」iPhoneとApple Watchで手軽に見守り", time: "11:00–12:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 12, day: 19, base: DX_BASE, title: "Canva活用講座", teacher: "", subtitle: "SNS向けデザイン実践 Instagram・LINE画像の作り分け", time: "13:00–14:00", kind: "regular", capacity: 10 },
  { year: 2026, month: 12, day: 26, base: DX_BASE, title: "生成AI活用講座", teacher: "", subtitle: "「ネット情報に振り回されない」Perplexityでの正しい情報を見極め術", time: "11:00–12:00", kind: "regular", capacity: 10 },

  // 1月 2027
  { year: 2027, month: 1, day: 2, base: DX_BASE, title: "技術活用講座", teacher: "", subtitle: "職場やお店、ご自宅のWIFI環境アップグレード！〜繋がらない部屋をなくすには？〜", time: "11:00–12:00", kind: "regular", capacity: 10 },
  { year: 2027, month: 1, day: 2, base: DX_BASE, title: "くらしの中のデジタルリテラシー講座", teacher: "", subtitle: "万が一トラブルに巻き込まれたら", time: "13:00–14:00", kind: "regular", capacity: 10 },
  { year: 2027, month: 1, day: 9, base: DX_BASE, title: "Google活用講座", teacher: "", subtitle: "みんなの意見をまとめる 〜Formsでアンケートと日程調整〜", time: "11:00–12:00", kind: "regular", capacity: 10 },
  { year: 2027, month: 1, day: 9, base: DX_BASE, title: "商店主DX LAB", teacher: "", subtitle: "AIとブレスト！新商品・新サービスのアイデア発想ワークショップ", time: "13:00–14:00", kind: "regular", capacity: 10 },
  { year: 2027, month: 1, day: 16, base: DX_BASE, title: "Apple活用講座", teacher: "", subtitle: "「体は資本」：AppleとAIを使った体調を整える管理・トレーニング術", time: "11:00–12:00", kind: "regular", capacity: 10 },
  { year: 2027, month: 1, day: 16, base: DX_BASE, title: "Canva活用講座", teacher: "", subtitle: "印刷を意識したデザイン入門 チラシをCanvaで作る", time: "13:00–14:00", kind: "regular", capacity: 10 },
  { year: 2027, month: 1, day: 23, base: DX_BASE, title: "生成AI活用講座", teacher: "", subtitle: "「言い回しに悩まない文章術」Geminiでやさしく・伝わる文章に整えよう", time: "11:00–12:00", kind: "regular", capacity: 10 },

  // 2月 2027
  { year: 2027, month: 2, day: 6, base: DX_BASE, title: "技術活用講座", teacher: "", subtitle: "パソコンの買い替え時の注意点〜買い替え前となるべく同じように使うには？〜", time: "11:00–12:00", kind: "regular", capacity: 10 },
  { year: 2027, month: 2, day: 6, base: DX_BASE, title: "くらしの中のデジタルリテラシー講座", teacher: "", subtitle: "毎日使うスマートフォン・パソコンを安全に使うために", time: "13:00–14:00", kind: "regular", capacity: 10 },
  { year: 2027, month: 2, day: 13, base: DX_BASE, title: "Google活用講座", teacher: "", subtitle: "地域の情報を発信する 〜Googleサイトでデジタル回覧板〜", time: "11:00–12:00", kind: "regular", capacity: 10 },
  { year: 2027, month: 2, day: 13, base: DX_BASE, title: "商店主DX LAB", teacher: "", subtitle: "従業員・お客様との連絡ツール 様々なアプリの比較とメリットデメリット", time: "13:00–14:00", kind: "regular", capacity: 10 },
  { year: 2027, month: 2, day: 20, base: DX_BASE, title: "Apple活用講座", teacher: "", subtitle: "「うっかりをなくす」：AppleとAIで忘れない生活を", time: "11:00–12:00", kind: "regular", capacity: 10 },
  { year: 2027, month: 2, day: 20, base: DX_BASE, title: "Canva活用講座", teacher: "", subtitle: "繰り返し使えるデザインの作り方 自分用テンプレート思考", time: "13:00–14:00", kind: "regular", capacity: 10 },
  { year: 2027, month: 2, day: 27, base: DX_BASE, title: "生成AI活用講座", teacher: "", subtitle: "「AIを日常で使いこなす」Gemini×NotebookLMで毎日の生活を効率化", time: "11:00–12:00", kind: "regular", capacity: 10 },

  // 3月 2027
  { year: 2027, month: 3, day: 6, base: DX_BASE, title: "技術活用講座", teacher: "", subtitle: "データ消失・デバイス故障時のデータ復旧対応〜状況把握と初動が大事〜", time: "11:00–12:00", kind: "regular", capacity: 10 },
  { year: 2027, month: 3, day: 6, base: DX_BASE, title: "くらしの中のデジタルリテラシー講座", teacher: "", subtitle: "これからのデジタルと暮らしと安全", time: "13:00–14:00", kind: "regular", capacity: 10 },
  { year: 2027, month: 3, day: 13, base: DX_BASE, title: "Google活用講座", teacher: "", subtitle: "心を豊かにするデジタル 〜YouTubeとArts & Culture〜", time: "11:00–12:00", kind: "regular", capacity: 10 },
  { year: 2027, month: 3, day: 13, base: DX_BASE, title: "商店主DX LAB", teacher: "", subtitle: "iPhone+Mac を活用した 仕事高速化 APPLE 活用ビジネス講座", time: "13:00–14:00", kind: "regular", capacity: 10 },
  { year: 2027, month: 3, day: 20, base: DX_BASE, title: "Apple活用講座", teacher: "", subtitle: "「バラバラなお便りも簡単にまとめる」：AppleとAIを活用した情報整理術", time: "11:00–12:00", kind: "regular", capacity: 10 },
  { year: 2027, month: 3, day: 20, base: DX_BASE, title: "Canva活用講座", teacher: "", subtitle: "テーマから完成までのデザインプロセス", time: "13:00–14:00", kind: "regular", capacity: 10 },
  { year: 2027, month: 3, day: 27, base: DX_BASE, title: "生成AI活用講座", teacher: "", subtitle: "「情報が散らからない」生成AIを使った写真・メモ・文章のまとめ方", time: "11:00–12:00", kind: "regular", capacity: 10 },
];

function deterministicBooked(cap: number, day: number, month: number, base: BaseCode): number {
  const seed = day * 7 + month * 3 + (base === Y_BASE ? 2 : 5);
  return Math.max(0, cap - (seed % (cap + 3)));
}

function baseEventsForDate(
  year: number,
  month: number,
  day: number,
  _weekday: number,
): EventItem[] {
  const matches = SCHEDULED.filter(
    (s) => s.year === year && s.month === month && s.day === day,
  );
  return matches.map((s) => {
    const key = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const baseCode = s.base === Y_BASE ? "y" : s.base === K_BASE ? "k" : "d";
    const baseName =
      s.base === Y_BASE ? "横須賀BASE" : s.base === K_BASE ? "港南台BASE" : "DXラボ";
    const address =
      s.base === Y_BASE ? YOKOSUKA_ADDRESS : s.base === K_BASE ? KOUNANDAI_ADDRESS : DXLAB_ADDRESS;
    const startHour = s.time.split(":")[0];
    const timeSuffix = s.base === DX_BASE ? `-${startHour}` : "";
    return {
      id: `${key}-${baseCode}${timeSuffix}`,
      base: s.base,
      baseName,
      title: s.title,
      teacher: s.teacher,
      subtitle: s.subtitle,
      time: s.time,
      kind: s.kind,
      capacity: s.capacity,
      booked: deterministicBooked(s.capacity, day, month, s.base),
      address,
      notes: s.notes || "",
    };
  });
}

const STORAGE_KEY = "evcal.edits.v2";

type EditsStore = Record<string, Partial<EventItem>>;

function loadEdits(): EditsStore {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveEdits(edits: EditsStore) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(edits));
}

export function eventsForDate(
  year: number,
  month: number,
  day: number,
  weekday: number,
): EventItem[] {
  const base = baseEventsForDate(year, month, day, weekday);
  const edits = loadEdits();
  return base.map((ev) => (edits[ev.id] ? { ...ev, ...edits[ev.id] } : ev));
}

export function updateEvent(id: string, patch: Partial<EventItem>) {
  const edits = loadEdits();
  edits[id] = { ...(edits[id] || {}), ...patch };
  saveEdits(edits);
  window.dispatchEvent(new CustomEvent("evcal:updated"));
}

export function resetEvent(id: string) {
  const edits = loadEdits();
  delete edits[id];
  saveEdits(edits);
  window.dispatchEvent(new CustomEvent("evcal:updated"));
}

export function resetAllEdits() {
  saveEdits({});
  window.dispatchEvent(new CustomEvent("evcal:updated"));
}

export type MonthCell = { year: number; month: number; day: number; weekday: number } | null;

export function buildMonth(year: number, month: number) {
  const first = new Date(year, month - 1, 1);
  const daysInMonth = new Date(year, month, 0).getDate();
  const startWeekday = first.getDay();
  const cells: MonthCell[] = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ year, month, day: d, weekday: new Date(year, month - 1, d).getDay() });
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return { year, month, cells };
}

export function remaining(ev: EventItem) {
  return Math.max(0, ev.capacity - ev.booked);
}

export function statusOf(ev: EventItem): EventStatus {
  const r = remaining(ev);
  if (r === 0) return "full";
  if (r <= Math.max(1, Math.floor(ev.capacity * 0.25))) return "few";
  return "open";
}

export const WEEKDAYS_JA = ["日", "月", "火", "水", "木", "金", "土"];
