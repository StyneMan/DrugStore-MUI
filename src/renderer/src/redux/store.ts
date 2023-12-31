import { configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./slices/loader";
import authReducer from "./slices/auth";
import searchReducer from "./slices/search";
import purchaseReducer from "./slices/purchase";
import productReducer from "./slices/product";
import categoryReducer from "./slices/categories";
import databaseReducer from "./slices/database";
import customerReducer from "./slices/customers";
import businessLocationsReducer from "./slices/business_locations";

export const store = configureStore({
  reducer: {
    loader: loaderReducer,
    auth: authReducer,
    search: searchReducer,
    purchase: purchaseReducer,
    product: productReducer,
    category: categoryReducer,
    database: databaseReducer,
    customers: customerReducer,
    business_locations: businessLocationsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
