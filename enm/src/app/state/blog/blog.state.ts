import { Blog } from '../../models/blog.model';
import { BlogListRequestErrorResponse } from 'src/app/models/blogListRequestErrorResponse';

export interface Blogs {
  [id: string]: Blog;
}

export interface BlogState {
  entities: Blogs;
  loaded: boolean;
  loading: boolean;
  selectedBlog: string,
  blogListRequestErrorResponse: BlogListRequestErrorResponse
}

export const initialState: BlogState = {
  entities: {},
  loaded: false,
  loading: false,
  selectedBlog: '',
  blogListRequestErrorResponse: null
};