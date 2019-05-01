import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  // Attributs
  title = 'Posts';
  posts = [{
    title: '',
    content: '',
    loveIts: 0
  }];

  postSubscription: Subscription;

  constructor(private postService: PostService) { }

  ngOnInit() {
    // La souscription au Subject du service est stockée dans "postSubscription"
    this.postSubscription = this.postService.postSubject.subscribe(
      (posts: any[]) => {
        this.posts = posts;
      }
    );
    // On émet la souscription pour récupérer les posts
    this.postService.emitPostSubject();
  }

}
