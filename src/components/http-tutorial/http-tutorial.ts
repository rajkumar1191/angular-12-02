import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiServiceCore } from '../../core/http/api.service';
import { AuthService } from '../../services/auth.service';

interface Post {
    id: number;
    title: string;
    body: string;
}

@Component({
    selector: 'app-http-tutorial',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './http-tutorial.html',
    styleUrl: './http-tutorial.css'
})
export class HttpTutorial implements OnInit {
    // posts: Post[] = [];
    posts = signal<Post[]>([]);
    loading = false;
    errorMsg: string | null = null;
    postResponse: any = null;

    //signal and change detection

    constructor(
        private apiService: ApiServiceCore,
        public authService: AuthService,
        // public cdr: ChangeDetectorRef
    ) { }

    ngOnInit() {
        console.log('[HttpTutorial] Authenticated:', this.authService.isAuthenticated);
    }

    // 1. Standardized GET Request success scenario
    loadData() {
        this.loading = true;
        this.errorMsg = null;
        this.posts.set([]);

        // Using our core wrapper instead of direct HttpClient
        this.apiService.get<Post[]>('/posts', { _limit: 3 }).subscribe({
            next: (data) => {
                console.log('Fetched Posts:', data);
                this.loading = false;
                this.posts.set(data);
                // this.cdr.detectChanges()
            },
            error: (err) => {
                this.errorMsg = err.message;
                this.loading = false;
            }
        });
    }

    // 2. Standardized POST request
    createData() {
        this.postResponse = null;
        const newPost = { title: 'Angular Rules', body: 'Standardized API Service', userId: 1 };

        this.apiService.post<any>('/posts', newPost).subscribe((res) => {
            this.postResponse = res;
            alert(`Created Successfully! Given ID: ${res.id}`);
        });
    }

    // 3. Simulating an Interceptor Error Catch (404 Not Found)
    triggerErrorResponse() {
        this.loading = true;
        this.errorMsg = null;

        // Triggering an endpoint that does not exist
        this.apiService.get('/this-endpoint-does-not-exist').subscribe({
            next: () => this.loading = false,
            error: (err) => {
                // The ErrorInterceptor caught, logged, and formatted this!
                this.errorMsg = err.message;
                this.loading = false;
            }
        });
    }

    toggleLogin() {
        if (this.authService.isAuthenticated) {
            this.authService.logout();
        } else {
            this.authService.login('demo-user');
        }
        // Note: Re-run 'Fetch Posts' and look at Developer Network Tab to see the 'Authorization' header added!
    }
}
