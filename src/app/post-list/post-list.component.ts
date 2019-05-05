import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit, OnDestroy {

  // Attributs
  title = 'Posts';
  posts = [];

  postSubscription: Subscription;

  constructor(private postService: PostService) { }

  ngOnInit() {
    // La souscription au Subject du service est stockée dans "postSubscription"
    // Cela permet de récupérer les postes (et par la suite de pouvoir faire un unsubscribe)
    this.postSubscription = this.postService.postSubject.subscribe(
      (posts: any[]) => {
        this.posts = posts;
      }
    );

    // Récupère les postes en BDD
    this.postService.getPosts();
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }

}
