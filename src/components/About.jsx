import Container from '@material-ui/core/Container';

const sectionStyle = { textAlign: 'left', marginBottom: '40px' };
const containerStyle = { textAlign: 'center', margin: '120px auto 40px' };
const descriptionStyle = { textAlign: 'left', marginBottom: '40px' };

const About = () => {
  return (
    <div style={containerStyle}>
      <Container maxWidth='md'>
        <h2>About</h2>
        <h3>本アプリケーションをご利用いただきましてありがとうございます。</h3>
        <div style={descriptionStyle}>
          <p>
            本アプリでは、ボクシングの採点結果について談論・ディスカッションすることができます。
            <br />
            ボクシングは通称 「The sweet science」,「The art of hitting and not
            getting hit」と呼ばれています。 <br />
            その名の通り、科学のように秩序だった思考が要求されるスポーツであることを理解し、多様な視点からボクシングを楽しめるようになれたら嬉しいです。
            また、ボクシング愛するコアなファンの意見を知り、知見を広げることでその奥深さ、魅力を伝えられると思います。
            <br />
            ボクシングのスコアリングシステムは、時に多くの論争を引き起こすかもしれませんが、健全なチャットにご協力お願いします！
            <br />
          </p>
        </div>

        <h1>Official boxing scoring criteria</h1>
        <div style={sectionStyle}>
          <h3>有効なクリーンヒット</h3>
          <p>
            ボクシングのタイトルマッチで最も重視されるのが有効なクリーンヒットです。有効なクリーンヒットとは、相手にダメージを与える顔面やボディへのパンチで、有効なクリーンヒットの数が多ければ、文句なしにポイントを奪取できます。
          </p>
          <h3>アグレッシブ（積極的な攻撃姿勢）</h3>
          <p>
            有効なクリーンヒット数が同じ場合や全くない場合は、積極的に攻撃を仕掛けて、パンチを出しているかどうかをチェックします。ただし、手を出さずにガードを固めて前へ出ているだけでは攻撃とみなされず、ポイントを奪うことはできません。
          </p>
          <h3>ディフェンス（防御技術）</h3>
          <p>
            有効なクリーンヒットでも、積極的な攻撃姿勢でも優劣が付かない場合は、相手の攻撃を無効にするディフェンス技術が評価されます。ただし、全くパンチを出さず、ディフェンスに専念したり、足を使って逃げ回っているだけでは、ポイントは奪えません（逃げ回るボクシングスタイルじゃあ、ファンは満足しませんよね）。
          </p>
          <h3>リングジェネラルシップ（主導権支配）</h3>
          <p>
            有効なクリーンヒット、積極的な攻撃姿勢、ディフェンス技術でも優劣を付けることができない場合は、どちらが試合の主導権を支配しているのか、つまり、どちらのペースで試合が進んでいるのかで優劣を付けます。
          </p>
        </div>

        <h1>Basic information</h1>
        <div style={sectionStyle}>
          <p>
            ・1ラウンドごとに優勢な方を10点とし、劣勢な方を減点する。（10POINT
            MUSTSYSTEM）
          </p>
          <p>・僅差であっても各ラウンドなるべく優劣を付けることになっている</p>
          <p>・採点に占める割合は、有効なクリーンヒットが最も大きい</p>
          <p>
            ・団体（WBA,WBC）によって各項目の採点に占める割合,優先順位が多少異なります。
          </p>
          <p>
            ・また地域コミッションやジャッジの出身地域により採点傾向の違いなどが見られます
          </p>
        </div>

        <h1>Point at issue</h1>
        <div style={sectionStyle}>
          <p>
            ・有効なクリーンヒット等で優劣が明かなラウンドと、僅差で微妙なラウンドとが
            共に１０対９と同じポイントとなるため試合全体の印象とは異なる結果がもたら
            されることも少なくない。現在の採点システム自体が試合全体の印象を正確に反
            映できるシステムではないとも言えるかもしれない。
          </p>
          <br />
          <p>
            ・各ラウンドの採点で１０対１０とすることは許されているものの、“僅差のラウ
            ンドでも積極的に１０対９の優劣をつけるべき”との「申し合わせ」がある。
            「世界戦はなるべく引き分けにはするべきではない」という見解や、
            「微妙なラウンドを振り分けられないジャッジは無能だ」という見方もあり、
            実質的には、かなり微妙なラウンドでも優劣を付ける傾向にある。
            そのため優劣が微妙なラウンドはジャッジ間でも採点が割れることが多々ある。
          </p>
          <br />
          <p>
            ・ジャッジの中にも、テクニックを高く評価する者や、手数を評価する者、ボディー
            打ちをあまり評価しない者,する者など微妙に評価するポイントが異なる場合がある
            といわれておりジャッジ間でも採点が大きく異なることもある。
          </p>
          <br />
          <p>
            ・観客の応援や歓声がジャッジの判定に影響を与えることもあると思われる。
            同じレベルのパンチが当たっていても、観客の反応がまったく違う場合などは、
            パンチの効果を見誤るということも起きかねない。
            また無観客試合の場合、パンチの音の大きさに左右されてしまう可能性もある。
            優劣が微妙な試合の場合、地元選手に有利な判定が起きてしまうことが無いとはいえない。
          </p>
          <br />
          <p>
            ・ジャッジはリングサイドから試合を見ているが、有効なパンチが死角に入りチェックできないことも起こりうる。
          </p>
        </div>
      </Container>
    </div>
  );
};
export default About;
