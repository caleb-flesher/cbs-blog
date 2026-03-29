import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { NavBar } from './nav-bar';

describe('NavBar', () => {
  let component: NavBar;
  let fixture: ComponentFixture<NavBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBar],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NavBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  // ── Component creation ──────────────────────────────────────────

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ── Initial state ───────────────────────────────────────────────

  it('should have menuOpen false by default', () => {
    expect(component.menuOpen).toBe(false);
  });

  it('should not have .open class on nav links by default', () => {
    const ul = fixture.debugElement.query(By.css('.navbar-links'));
    expect(ul.nativeElement.classList).not.toContain('open');
  });

  it('should not have .open class on hamburger by default', () => {
    const btn = fixture.debugElement.query(By.css('.hamburger'));
    expect(btn.nativeElement.classList).not.toContain('open');
  });

  // ── toggleMenu() ────────────────────────────────────────────────

  it('should set menuOpen to true when toggleMenu() is called while closed', () => {
    component.toggleMenu();
    expect(component.menuOpen).toBe(true);
  });

  it('should set menuOpen to false when toggleMenu() is called while open', () => {
    component.menuOpen = true;
    component.toggleMenu();
    expect(component.menuOpen).toBe(false);
  });

  // ── closeMenu() ─────────────────────────────────────────────────

  it('should set menuOpen to false when closeMenu() is called', () => {
    component.menuOpen = true;
    component.closeMenu();
    expect(component.menuOpen).toBe(false);
  });

  it('should remain false when closeMenu() is called while already closed', () => {
    component.closeMenu();
    expect(component.menuOpen).toBe(false);
  });

  // ── Hamburger button ────────────────────────────────────────────

  it('should render the hamburger button', () => {
    const btn = fixture.debugElement.query(By.css('.hamburger'));
    expect(btn).toBeTruthy();
  });

  it('should call toggleMenu() when hamburger is clicked', () => {
    vi.spyOn(component, 'toggleMenu');
    const btn = fixture.debugElement.query(By.css('.hamburger'));
    btn.triggerEventHandler('click', null);
    expect(component.toggleMenu).toHaveBeenCalled();
  });

  it('should add .open to hamburger when menuOpen is true', () => {
    component.menuOpen = true;
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('.hamburger'));
    expect(btn.nativeElement.classList).toContain('open');
  });

  it('should set aria-expanded to true on hamburger when menu is open', () => {
    component.menuOpen = true;
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('.hamburger'));
    expect(btn.nativeElement.getAttribute('aria-expanded')).toBe('true');
  });

  it('should set aria-expanded to false on hamburger when menu is closed', () => {
    const btn = fixture.debugElement.query(By.css('.hamburger'));
    expect(btn.nativeElement.getAttribute('aria-expanded')).toBe('false');
  });

  // ── Nav links ───────────────────────────────────────────────────

  it('should render all four nav links', () => {
    const links = fixture.debugElement.queryAll(By.css('.navbar-links a'));
    expect(links.length).toBe(4);
  });

  it('should add .open to navbar-links when menuOpen is true', () => {
    component.menuOpen = true;
    fixture.detectChanges();
    const ul = fixture.debugElement.query(By.css('.navbar-links'));
    expect(ul.nativeElement.classList).toContain('open');
  });

  it('should call closeMenu() when a nav link is clicked', () => {
    vi.spyOn(component, 'closeMenu');
    const firstLink = fixture.debugElement.query(By.css('.navbar-links a'));
    firstLink.triggerEventHandler('click', null);
    expect(component.closeMenu).toHaveBeenCalled();
  });

  it('should close the menu after a nav link is clicked', () => {
    component.menuOpen = true;
    fixture.detectChanges();
    const firstLink = fixture.debugElement.query(By.css('.navbar-links a'));
    firstLink.triggerEventHandler('click', null);
    expect(component.menuOpen).toBe(false);
  });

  // ── Logo ────────────────────────────────────────────────────────

  it('should render the logo image', () => {
    const img = fixture.debugElement.query(By.css('.navbar-logo img'));
    expect(img).toBeTruthy();
  });

  it('should have correct alt text on the logo', () => {
    const img = fixture.debugElement.query(By.css('.navbar-logo img'));
    expect(img.nativeElement.getAttribute('alt')).toBe("Caleb's Bike Shop Logo");
  });
});