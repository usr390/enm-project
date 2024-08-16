import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, map } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import * as blogSelectors from './../../state/blog/blog.selectors';
import { Router } from '@angular/router';


@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.less']
})
export class BlogPageComponent {

  constructor(private store$: Store<AppState>, private router: Router){}

  selectedBlog$ = combineLatest([this.store$.select(blogSelectors.selectAll), this.store$.select(blogSelectors.selectSelectedBlogId)]).pipe(
    map(([blogs, selectedBlog]) => blogs.filter(blog => blog._id === selectedBlog)[0]),
  );

  goBack() {
    this.router.navigate(['/blog']); 
  }

}
