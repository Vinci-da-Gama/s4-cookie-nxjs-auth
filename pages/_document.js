import Document, { Html, Head, Main, NextScript } from "next/document";
// import dompurify from "dompurify";

import { getServerSideToken, getUserScript } from "../lib/auth";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const props = await Document.getInitialProps(ctx);
    /* include, otherwise we will get an error telling us: Warning: Expected server HTML to contain a matching <div> in <div>. */
    const authData = getServerSideToken(ctx.req);
    return { ...props, ...authData };
  }

  render() {
    const { user = {} } = this.props;

    return (
      <Html>
        <Head />
        <body>
          <Main />
          <script
            dangerouslySetInnerHTML={{
              __html: getUserScript(user),
            }}
          />
          <NextScript />
        </body>
      </Html>
    );
  }
}
