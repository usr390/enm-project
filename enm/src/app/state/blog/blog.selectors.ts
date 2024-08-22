import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { Blog } from "../../models/blog.model";
import { BlogState } from "./blog.state";

export const selectFeature = (state: AppState): BlogState => state.blogs;

export const selectEntities = createSelector(
  selectFeature,
  (state: BlogState): { [id: string]: Blog } => state.entities
);

export const selectAll = createSelector(selectEntities, (entities): Blog[] =>
  Object.values(entities).reverse()
);

export const selectSelectedBlogId = createSelector(
  selectFeature,
  (state: BlogState): string => state.selectedBlog
);

export const selectLoading = createSelector(
  selectFeature,
  (state: BlogState): boolean => state.loading
);

export const selectLoaded = createSelector(
  selectFeature,
  (state: BlogState): boolean => state.loaded
);


export const selectBlogCount = createSelector(
  selectAll,
  (blogs: Blog[]): number => {
    return blogs.length;
  }
);
