import { Action, createReducer, on } from "@ngrx/store";
import { Blogs, BlogState, initialState } from "./blog.state";
import { blogListRequest, blogListRequestErrorResponse, blogListRequestSuccessResponse, selectBlogFromBlogList } from "./blog.actions";


const _blogReducer = createReducer(
    initialState,
    on(selectBlogFromBlogList, (state, selectBlogFromBlogList ) => {
        return {
            ...state,
            selectedBlog: selectBlogFromBlogList._id
        }
    }),
    on(blogListRequest, (state) => {
        return {
          ...state,
          loaded: false,
          loading: true,
        };
    }),
    on(blogListRequestSuccessResponse, (state, { blogs }) => {
        const entities: Blogs = {};
        blogs.forEach((blog) => (entities[blog._id] = blog));
        return {
          ...state,
          entities,
          loaded: true,
          loading: false,
        };
    }),
    on(blogListRequestErrorResponse, (state, { error }) => {
        return {
            ...state,
            blogListRequestErrorResponse: error,
            loaded: false
        }
    })
);

export function blogReducer(state: BlogState | undefined, action: Action) {
    return _blogReducer(state, action)
}
