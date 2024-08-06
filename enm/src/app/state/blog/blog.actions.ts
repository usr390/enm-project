import { createAction, props } from '@ngrx/store'
import { Blog } from 'src/app/models/blog.model';
import { BlogListRequestErrorResponse } from 'src/app/models/blogListRequestErrorResponse';

export const selectBlogFromBlogList = createAction('[Blog] Blog Selected From Blog List', props<{ _id: string }>());

export const blogListRequest = createAction('[Blog] Blog List HTTP Request'); 
export const blogListRequestSuccessResponse = createAction('[Blog] Blog List HTTP Request Success Response', props<{ blogs: Blog[] }>()); 
export const blogListRequestErrorResponse = createAction('[Blog] Blog List HTTP Request Error Response', props<{ error: BlogListRequestErrorResponse }>()); 
