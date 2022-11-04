import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, pluck } from 'rxjs';
import { CommentService } from './comment.service';

@Component({
  selector: 'hinv-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  
  constructor(private commentService: CommentService,
    private activatedRouter: ActivatedRoute) { }

  comments$ = this.commentService.getComments();

  comment$ = this.activatedRouter.data.pipe(
    pluck('comments')
  )

  ngOnInit(): void {
    // this.activatedRouter.data.subscribe(data => {
    //   console.log(data['comments']);
    // })
  }

}
