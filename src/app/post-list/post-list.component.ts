import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  // Paramètre
  postsParam = [{
    title: '',
    content: '',
    loveIts: ''
  }];

  // Attribut
  title = 'Posts';

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postsParam = this.postService.getPosts();
  }

}
