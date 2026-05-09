import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { injectContentFiles } from '@analogjs/content';
import PostAttributes from '../post-attributes';
import BuildAttributes from '../build-attributes';

export interface StravaActivity {
  id: number;
  name: string;
  type: 'Run' | 'Ride' | 'Swim' | 'Hike' | 'Walk';
  distance: number;        // meters
  moving_time: number;     // seconds
  elapsed_time: number;    // seconds
  total_elevation_gain: number; // meters
  start_date: string;
  average_speed: number;   // m/s
  average_heartrate?: number;
}

export interface StravaWeeklyStats {
  distance: number;        // meters
  moving_time: number;     // seconds
  elevation_gain: number;  // meters
  activity_count: number;
}

export interface StravaProfile {
  firstname: string;
  lastname: string;
  profile_medium: string;
  city: string;
  state: string;
}

interface StravaData {
  generatedAt: string;
  profile: StravaProfile;
  weeklyStats: StravaWeeklyStats;
  recentActivities: StravaActivity[];
}

@Component({
  selector: 'home-page',
  imports: [CommonModule, RouterLink],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnInit {
  // ── Blog & Builds ──────────────────────────────────────────────────────────
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  private readonly posts = injectContentFiles<PostAttributes>()
    .filter(post => post.filename.includes('/blog/'))
    .filter(post => !post.filename.split('/').pop()!.startsWith('DRAFT'))
    .sort((a, b) =>
      new Date(b.attributes.date).getTime() -
      new Date(a.attributes.date).getTime()
    );

  private readonly builds = injectContentFiles<BuildAttributes>()
    .filter(build => build.filename.includes('/bike-builds/'))
    .filter(build => !build.filename.split('/').pop()!.startsWith('DRAFT'))
    .sort((a, b) =>
      new Date(b.attributes.date).getTime() -
      new Date(a.attributes.date).getTime()
    );

  readonly latestPost = this.posts[0];
  readonly latestBikeBuild = this.builds[0];

  // ── Strava ─────────────────────────────────────────────────────────────────

  profile: StravaProfile = {
    firstname: '',
    lastname: '',
    profile_medium: '',
    city: '',
    state: '',
  };

  weeklyStats: StravaWeeklyStats = {
    distance: 0,
    moving_time: 0,
    elevation_gain: 0,
    activity_count: 0,
  };

  recentActivities: StravaActivity[] = [];
  stravaLoaded = false;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return; // skip on server

    this.http.get<StravaData>('/strava.json').subscribe({
      next: data => {
        console.log('Strava data loaded:', data);
        this.profile = data.profile;
        this.weeklyStats = data.weeklyStats;
        this.recentActivities = data.recentActivities;
        this.stravaLoaded = true;
      },
      error: err => {
        console.warn('Could not load Strava data:', err);
        this.stravaLoaded = true;
      },
    });
  }

  // ── Strava helpers ─────────────────────────────────────────────────────────

  formatDistance(meters: number): string {
    const miles = meters / 1609.344;
    return miles >= 10 ? miles.toFixed(1) + ' mi' : miles.toFixed(2) + ' mi';
  }

  formatTime(seconds: number): string {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  }

  formatPace(activity: StravaActivity): string {
    if (activity.type === 'Ride') {
      const mph = activity.average_speed * 2.23694;
      return mph.toFixed(1) + ' mph';
    }
    const secPerMile = 1609.344 / activity.average_speed;
    const min = Math.floor(secPerMile / 60);
    const sec = Math.round(secPerMile % 60);
    return `${min}:${sec.toString().padStart(2, '0')} /mi`;
  }

  formatRelativeDate(dateStr: string): string {
    const diffDays = Math.floor(
      (Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24)
    );
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  }

  getActivityIcon(type: string): string {
    const icons: Record<string, string> = {
      Run: '🏃', Ride: '🚴', Swim: '🏊', Hike: '🥾', Walk: '🚶',
    };
    return icons[type] ?? '⚡';
  }

  getActivityColor(type: string): string {
    const colors: Record<string, string> = {
      Run: 'activity-run', Ride: 'activity-ride', Hike: 'activity-hike',
      Swim: 'activity-swim', Walk: 'activity-walk',
    };
    return colors[type] ?? 'activity-default';
  }

  get initials(): string {
    if (!this.profile.firstname && !this.profile.lastname) return '?';
    return (this.profile.firstname[0] + this.profile.lastname[0]).toUpperCase();
  }

  get weeklyDistanceKm(): string {
    const miles = this.weeklyStats.distance / 1609.344;
    return miles.toFixed(1);
  }

  get weeklyTimeFormatted(): string {
    return this.formatTime(this.weeklyStats.moving_time);
  }

  get weeklyElevationFormatted(): string {
    const feet = Math.round(this.weeklyStats.elevation_gain * 3.28084);
    return feet + ' ft';
  }
}