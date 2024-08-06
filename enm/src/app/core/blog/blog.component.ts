import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import * as blogActions from './../../state/blog/blog.actions';
import * as blogSelectors from './../../state/blog/blog.selectors';



@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.less']
})
export class BlogComponent {

  constructor(
    private store$: Store<AppState>,
  ) { }

  listLoading$ = this.store$.select(blogSelectors.selectLoading); // for displaying loading animation
  listLoaded$ = this.store$.select(blogSelectors.selectLoaded); // for deciding whether to dispatch init action
  blogCount$ = this.store$.select(blogSelectors.selectBlogCount); // for deciding whether to dispatch init action
  blogList$ = this.store$.select(blogSelectors.selectAll);

  ngOnInit() {
    this.store$.dispatch(blogActions.blogListRequest())
  }

  onBlogListSelection(_id: string | undefined) {
    this.store$.dispatch(blogActions.selectBlogFromBlogList({_id: _id as string}))
  }

}
