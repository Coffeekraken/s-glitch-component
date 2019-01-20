module.exports = {
  // server port
  port: 3000,

  // title
  title: "s-glitch-component",

  // layout
  layout: "right",

  // compile server
  compileServer: {
    // compile server port
    port: 4000
  },

  // editors
  editors: {
    html: {
      language: "html",
      data: `
        <s-glitch min-duration="0" max-duration="1000" fps="60">
          <header class="header">
            <div class="header__img" style="background-image:url(/demo/dist/img/picture-06.jpg)"></div>
            <article class="header__article">
              <h1 class="h1 m-b">
                Primis ullamcorper
              </h1>
              <p class="p p--lead m-b">
                Magna auctor imperdiet senectus dis sed interdum fringilla etiam
                enim himenaeos velit litora ultrices, suscipit justo sem cursus quam
                dignissim leo ante cras eu dapibus. Pharetra quisque ligula.
              </p>
              <a class="btn btn--primary"> Do something! </a>
            </article>
          </header>
        </s-glitch>
      `
    },
    css: {
      language: "scss",
      data: `
        @import "node_modules/coffeekraken-sugar/index";
        @import "node_modules/coffeekraken-s-typography-component/index";
        @import "node_modules/coffeekraken-s-button-component/index";

        @include s-setup(());
        @include s-init();
        @include s-classes();

        @include s-typography-classes();
        @include s-button-classes();

        body {
        }

        s-glitch {
          @include s-fit(absolute);
        }
        .header {
          @include s-fit(absolute);
        }
        .header__img {
          @include s-fit(absolute);
          background-size: cover;
          background-position: 50% 50%;
        }
        .header__article {
          @include s-position(absolute, middle, center);
          color: white;
        }

      `
    },
    js: {
      language: "js",
      data: `
        import '@babel/polyfill'
        import SGlitchComponent from './dist/index'
      `
    }
  }
}
