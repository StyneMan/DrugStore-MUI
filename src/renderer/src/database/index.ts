import fakeIndexedDB from "fake-indexeddb";
// import fakeIDBKeyRange from "fake-indexeddb/"
// const db = new Dexie("MyDatabase");

import { addRxPlugin, createRxDatabase } from "rxdb";
// import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { cartSchema } from "./schemas/cartschema";
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode";
import { RxDBQueryBuilderPlugin } from "rxdb/plugins/query-builder";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";

import { RxDBUpdatePlugin } from 'rxdb/plugins/update';

import fakeIDBKeyRange from 'fake-indexeddb/lib/FDBKeyRange';
import { draftSchema } from "./schemas/draftschema";
import { categorySchema } from "./schemas/categorySchema";
import { authSchema } from "./schemas/authSchema";
import { paymentMethodSchema } from "./schemas/paymentMethodSchema";

addRxPlugin(RxDBQueryBuilderPlugin);
addRxPlugin(RxDBDevModePlugin);
addRxPlugin(RxDBUpdatePlugin);

// export default async function AppDatabase() {
//   try {
//     const dbSuffix = await window.getDBSuffix();

//     const db = await createRxDatabase({
//       name: "drugstoreDb",
//       storage: getRxStorageDexie(),
//     });

//     // create orders collections
//     const ordersCollections = await db.addCollections({
//       orders: {},
//     });

//     // create cart collections
//     const cartCollections = await db.addCollections({
//       carts: {},
//     });

//     // create drafts collections
//     const draftsCollections = await db.addCollections({
//       drafts: {},
//     });

//     const addToCart = async () => {
//       try {
//         await cartCollections.carts.insert({ id: "foo", name: "bar" });
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     const placeOrder = async () => {
//       try {
//         await ordersCollections.orders.insert({ id: "foo", name: "bar" });
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     const saveToDraft = async () => {
//       try {
//         await draftsCollections.drafts.insert({ id: "foo", name: "bar" });
//       } catch (error) {
//         console.log(error);
//       }
//     };
//   } catch (error) {
//     console.log("ERROR  O :: ", error);
//   }
// }

export async function getDatabase(name: string) {
  try {
    const db = await createRxDatabase({
      name: name,
      storage: getRxStorageDexie({
        indexedDB: fakeIndexedDB,
        IDBKeyRange: fakeIDBKeyRange,
      }),
      ignoreDuplicate: true
    });
 
    // console.log("creating cart-collection..");
    await db.addCollections({
      carts: { 
        schema: cartSchema,
      },
    });

    // console.log("creating draft-collection..");
    await db.addCollections({
      drafts: {
        schema: draftSchema,
      },
    });

    // console.log("creating category-collection..");
    await db.addCollections({
      categories: {
        schema: categorySchema,
      },
    });

     // console.log("creating auth-collection..");
     await db.addCollections({
      auth: {
        schema: authSchema,
      },
    });

     // console.log("creating payment-method-collection..");
     await db.addCollections({
      paymentmethods: {
        schema: paymentMethodSchema,
      },
    });

    return db;
  } catch (error) {
    console.log("CAUGHT ERROR", error);
    
  }
}
