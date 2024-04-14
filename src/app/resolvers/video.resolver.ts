import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Video } from '../model/video';
import { StreamingService } from '../services/streaming.service';

@Injectable({
  providedIn: 'root'
})
export class VideoResolver implements Resolve<Video> {

  constructor(private streamingService: StreamingService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Video> {
    const videoId = +route.queryParamMap.get('v');
    
    return this.streamingService.getVideoById(videoId);
  }
}
