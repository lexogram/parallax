/**
 * The App component takes care of determining which view to show.
 * The methods of the GetPage class are added to the App instance
 * but are kept here to keep each feature of the App component
 * neatly organized.
 *
 * Pages to show:
 * 1.  loading  — Splash screen, while account data is loading
 * 2.  fetching — Curtains, while JSON for whole story is loading
 * 3.  teaser   — Curtains, while preview assets loading
 * 4.  staging  — Preview while main assets loading
 * 5.  scene    — where user can interact with staged scene
 *
 * 6.  welcome  — when:
 *     • the Account holder is known
 *     • and there is only one reader or a default reader
 *     • and auto_start is disabled
 * 7.  whoRyou  — when
 *     • the Account holder is known
 *     • and there are several readers
 *     • and no default reader is chosen
 * 8.  library  — when
 *     • Current reader has been defined
 *     • and auto_start is disabled
 *       OR
 *     • The Library was selected from the menu
 * 9.  account  —
 * 10. prefs    —
 * 11. aboutUs  —
 *
 * On startUp:
 * • Show the splash screen
 * • Check if there is a registered or subscribed user
 */

// Components
import Splash from "../components/splash";
import Request from "../components/request";
import Title from "../components/title";
import Endless from "../components/endless";
import Progress from "../components/progress";
import Background from "../components/background";
// import Viewer from "../components/viewer";

// Utilities
import { resetObject } from "../tools/utilities";

const components = {
  Endless,
  Progress
};

class GetPage {
  getPage() {
    switch (this.state.page) {
      case "loading":
        return <Splash />;
      case "request":
        return <Request
          {...this.pageOptions}
        />;
      // return <Viewer />;

      default:
        return "This keeps the linter happy";
    }
  }

  setPageFor(delivery) {
    // delivery = {
    //   id:      <story_id | jwt>
    //   type:    <account | story | library>
    //   status:  <request | roster | preview | assets | staged>,
    //   payload: <preload only, unless server error>
    // };
    // This is received via App.handOver() after Courier tells
    // Store about a delivery request or completion.

    // console.log("setPageFor delivery:", delivery);

    switch (delivery.type) {
      case "account":
        return this.setAccountPageFor(delivery);
      case "story":
        return this.setStoryPageFor(delivery);
      case "library":
        return this.setLibraryPageFor(delivery);
      default:
        return "this keeps the linter happy";
    }
  }

  // ACCOUNT // ACCOUNT // ACCOUNT // ACCOUNT // ACCOUNT // ACCOUNT //

  setAccountPageFor(delivery) {}

  // SCENE // SCENE // SCENE // SCENE // SCENE // SCENE // SCENE //

  setStoryPageFor(delivery) {
    const { id, status, payload } = delivery;
    let page;

    switch (status) {
      case "request":
        page = this.setStoryRequestPage(id);
        break;
      case "roster":
        page = this.setStoryRosterPage(payload);
        break;
      case "preview":
        page = this.setStoryPreviewPage(payload);
        break;
      case "assets":
        page = this.setStoryAssetsPage(payload);
        break;
      case "staged":
        page = this.setStoryScene();
        break;
      default:
        return "This keeps the linter happy";
    }

    this.pageChange({ page });
  }

  setStoryRequestPage(id) {
    if (!id) {
      /// <<< HARD-CODED: replace with L10n string
      id = "Loading story...";
      /// HARD-CODED >>>
    }

    resetObject(this.pageOptions);
    const options = {
      title: id,
      component: "Endless"
    }
    const children = this.getChildren(options);
    this.pageOptions.children = children;
    return "request";
  }

  setStoryRosterPage(payload) {
    // console.log("setStoryRosterPage payload:", payload);
    // { age_range:    [<integer>, <integer>]
    // , creation_date: <Date>;
    // , l10n:{
    //     author:  [<string>];
    //   , keyword: [];
    //   , summary: <string>;
    //   , theme:   [<string>, ...]
    //   , title:   <string>;
    //   , voice:   [<string>];
    //   }
    // , modification_date: <Date>;
    // , name: <string>;
    // , sequence_ids: [];
    // , splash_screen: <url>
    // }

    const { l10n, splash_screen } = payload
    const { title } = l10n

    resetObject(this.pageOptions);
    const options = {
      title,
      background: splash_screen,
      component: "Progress"
    }
    const children = this.getChildren(options)
    this.pageOptions.children = children;
    return "request";

  }

  setStoryPreviewPage() {}

  setStoryAssetsPage() {}

  setStoryScene() {}

  getChildren(options) {
    const keys = Object.keys(options)
    const children = keys.map((key) => {
      const value = options[key] // with Capital for component

      switch (key) {
        case "component":
          const Component = components[value]
          return <Component key={value} />;
        case "title":
          return <Title key="title">{value}</Title>;
        case "background":
          return <Background key="background" src={value} />
        default:
          return "keep the linter happy"
      }
    });

    return children;
  }

  // LIBRARY // LIBRARY // LIBRARY // LIBRARY // LIBRARY // LIBRARY //

  setLibraryPageFor(delivery) {}

  //
}

export default GetPage;
