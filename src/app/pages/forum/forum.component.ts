import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ViewUserResponse } from 'src/app/models/wordpress.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'forum-page',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss'],
})
export class ForumComponent implements OnInit {
  category = null;
  users: ViewUserResponse[];

  constructor(private activatedRoute: ActivatedRoute, public app: AppService) {}

  ngOnInit() {
    this.doLoadCategoryPosts();
  }

  doLoadCategoryPosts() {
    this.app.profileID = null; // to search all post through category.
    this.activatedRoute.params.subscribe(params => {
      if (params['slug'] == null) {
        this.category = 'All Posts';
        this.app.categoryID = null;
      }
      if (this.app.categories !== null) {
        this.app.categories.filter(category => {
          if (category.slug === params['slug']) {
            this.category = category.name;
            this.app.categoryID = category.id;
          }
        });
      }
      this.app.pageIndex = 0;
      this.app.loadPosts();
    });
  }
}
