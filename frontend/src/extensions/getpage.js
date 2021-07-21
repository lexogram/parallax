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
// import Viewer from "../components/viewer";

// Utilities
import { resetObject } from "../tools/utilities";

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

<<<<<<< HEAD
    // console.log("setPageFor delivery:", delivery);
=======
    console.log("setPageFor delivery:", delivery);
>>>>>>> 2876f44784610b61a87a6a8eb44f2c94aaecabe5

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
    const children = this.getChildren(id, "endless");
    this.pageOptions.children = children;
    return "request";
  }

  setStoryRosterPage() {}

  setStoryPreviewPage() {}

  setStoryAssetsPage() {}

  setStoryScene() {}

  getChildren(...args) {
    const children = args.map((argument) => {
      switch (argument) {
        case "endless":
          return <Endless
            key="endless"
          />;

        default:
          return <Title key="title">{argument}</Title>;
      }
    });

    return children;
  }

  // LIBRARY // LIBRARY // LIBRARY // LIBRARY // LIBRARY // LIBRARY //

  setLibraryPageFor(delivery) {}

  //
}

export default GetPage;
