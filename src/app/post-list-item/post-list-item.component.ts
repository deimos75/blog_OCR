import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})
export class PostListItemComponent implements OnInit {

  // Paramètres provenant de 'post-list.component.html'
  @Input() titleParam: string;
  @Input() contentParam: string;
  @Input() loveItsParam: number;
  @Input() dateParam: string;
  @Input() idParam: number;

  // Attibuts
  post: Post;
  signeLoveIts: string;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.post = new Post(this.titleParam, this.contentParam, this.loveItsParam, this.dateParam);
    this.initColor();
  }

  // Méthodes
  initColor() {
    if (this.loveItsParam > 0) {
      this.signeLoveIts = 'positif';
    } else if (this.loveItsParam < 0) {
      this.signeLoveIts = 'négatif';
    } else {
      this.signeLoveIts = 'zéro';
    }
  }

  onLoveItsPlus() {
    this.loveItsParam++;
    this.initColor();
    this.postService.saveLoveIts(this.idParam, this.loveItsParam);
    console.log('loveIts = ' + this.loveItsParam);
  }

  onLoveItsMinus() {
    this.loveItsParam--;
    this.initColor();
    this.postService.saveLoveIts(this.idParam, this.loveItsParam);
    console.log('loveIts = ' + this.loveItsParam);
  }

  onDelete() {
    this.postService.deletePost(this.idParam);
  }

}
