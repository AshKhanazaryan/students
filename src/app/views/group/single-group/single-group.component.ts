import {Component, OnDestroy, OnInit} from '@angular/core';
import {GroupService} from '../../../services/group.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-single-group',
  templateUrl: './single-group.component.html',
  styleUrls: ['./single-group.component.scss']
})
export class SingleGroupComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public listName: Array<any>[] = [];
  constructor(private groupService: GroupService,) { }

  ngOnInit(): void {
    this.subscription = this.groupService.castData.subscribe((res: any) => {
      this.listName.push(res);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
