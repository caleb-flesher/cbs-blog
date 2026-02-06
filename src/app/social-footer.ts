import { Component } from '@angular/core';

@Component({
  selector: 'social-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div class="footer-inner">
        <span class="footer-text">© {{ year }} Caleb's Bike Shop</span>

        <div class="footer-socials">
          <a
            href="https://github.com/caleb-flesher"
            target="_blank"
            aria-label="GitHub"
          >
            <i class="fab fa-github"></i>
          </a>
          <a
            href="https://instagram.com/caleb.flesher"
            target="_blank"
            aria-label="Instagram"
          >
            <i class="fab fa-instagram"></i>
          </a>
          <a
            href="https://linkedin.com/in/caleb-flesher"
            target="_blank"
            aria-label="LinkedIn"
          >
            <i class="fab fa-linkedin"></i>
          </a>
        </div>
      </div>
    </footer>
  `,
  styles: `
    .footer {
      width: 100%;
      background-color: #052800;
      color: white;
      padding: 16px 0;
    }

    .footer-inner {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 24px;

      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }

    .footer-text {
      font-size: 0.9rem;
      opacity: 0.8;
    }

    .footer-socials {
      display: flex;
      gap: 16px;
    }

    .footer-socials a {
      color: white;
      font-size: 1.25rem;
      transition:
        opacity 0.3s ease,
        transform 0.3s ease;
    }

    .footer-socials a:hover {
      opacity: 0.7;
      transform: translateY(-2px);
    }
  `,
})
export class SocialFooter {
  year = new Date().getFullYear();
}
