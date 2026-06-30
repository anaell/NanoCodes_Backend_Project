@extends('layouts.app')

@section('content')

{{-- ── NAVBAR ── --}}
<nav class="nav">
    <a href="/" class="nav-logo">ServiceConnect</a>
    <ul class="nav-links">
        <li><a href="#">Find Artisans</a></li>
        <li><a href="#">How it Works</a></li>
        <li><a href="#">About</a></li>
    </ul>
    <div class="nav-actions">
        <a href="{{ route('login') }}" class="btn-ghost">Login</a>
        <a href="{{ route('register') }}" class="btn-primary">Sign Up</a>
    </div>
</nav>

{{-- ── SIGNUP SPLIT LAYOUT ── --}}
<div class="auth-wrapper">

    {{-- Hero panel --}}
    <div class="signup-hero">
        {{-- Replace src with your actual hero image --}}
        <img
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80"
            alt="Artisan at work"
            class="signup-hero-img">
        <div class="hero-overlay">
            <div class="verified-badge">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Verified Artisans Only
            </div>
            <h2 class="hero-headline">Your gateway to Nigerian craftsmanship.</h2>
            <p class="hero-sub">Join over 10,000 Nigerians connecting with vetted, professional artisans for every home and business need.</p>
            <div class="hero-trust">
                <div class="avatars">
                    <span></span><span></span><span></span>
                </div>
                Trusted by local homeowners
            </div>
        </div>
    </div>

    {{-- Form panel --}}
    <div class="signup-form-panel">
        <h2>Create your account</h2>
        <p class="subtitle">Choose your role to get started.</p>

        @if($errors->any())
            <div class="alert-error">
                Please fix the errors below to continue.
            </div>
        @endif

        <form method="POST" action="{{ route('register') }}" id="registerForm">
            @csrf

            {{-- Role selector --}}
            <div class="role-selector">
                <button type="button"
                    class="role-btn {{ old('role', 'customer') === 'customer' ? 'active' : '' }}"
                    onclick="selectRole('customer')">
                    <div class="check">✓</div>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                    </svg>
                    I am a Customer
                </button>
                <button type="button"
                    class="role-btn {{ old('role') === 'artisan' ? 'active' : '' }}"
                    onclick="selectRole('artisan')">
                    <div class="check">✓</div>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
                    </svg>
                    I am an Artisan
                </button>
            </div>
            <input type="hidden" name="role" id="roleInput" value="{{ old('role', 'customer') }}">

            {{-- Full name --}}
            <div class="form-group">
                <label for="name">Full Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="e.g. Chinelo Adebayo"
                    value="{{ old('name') }}"
                    class="{{ $errors->has('name') ? 'error' : '' }}"
                    autocomplete="name"
                    required>
                @error('name')
                    <span class="field-error">{{ $message }}</span>
                @enderror
            </div>

            {{-- Email --}}
            <div class="form-group">
                <label for="email">Email Address</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="JohnDoe@.com"
                    value="{{ old('email') }}"
                    class="{{ $errors->has('email') ? 'error' : '' }}"
                    autocomplete="email"
                    required>
                @error('email')
                    <span class="field-error">{{ $message }}</span>
                @enderror
            </div>

            {{-- Password --}}
            <div class="form-group">
                <label for="password">Password</label>
                <div class="input-wrap">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="••••••••"
                        class="{{ $errors->has('password') ? 'error' : '' }}"
                        autocomplete="new-password"
                        oninput="updateStrength(this.value)"
                        required>
                    <button type="button" class="toggle-pw" onclick="togglePassword('password', this)" aria-label="Toggle password">
                        <svg width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/>
                            <circle cx="12" cy="12" r="3"/>
                        </svg>
                    </button>
                </div>
                <div class="password-strength">
                    <div class="strength-bar" id="bar1"></div>
                    <div class="strength-bar" id="bar2"></div>
                    <div class="strength-bar" id="bar3"></div>
                    <div class="strength-bar" id="bar4"></div>
                </div>
                <p class="password-hint">Must be at least 8 characters with one special symbol.</p>
                @error('password')
                    <span class="field-error">{{ $message }}</span>
                @enderror
            </div>

            {{-- Confirm password (hidden field for Laravel validation) --}}
            <input type="hidden" name="password_confirmation" id="password_confirmation">

            {{-- Primary location --}}
            <div class="form-group">
                <label for="city">Primary Location</label>
                <select id="city" name="city" class="{{ $errors->has('city') ? 'error' : '' }}" required>
                    <option value="" disabled {{ old('city') ? '' : 'selected' }}>Select your city</option>
                    @foreach([
                        'Lagos','Abuja','Port Harcourt','Kano','Ibadan',
                        'Enugu','Kaduna','Benin City','Aba','Onitsha',
                        'Warri','Jos','Uyo','Calabar','Owerri'
                    ] as $city)
                        <option value="{{ $city }}" {{ old('city') === $city ? 'selected' : '' }}>
                            {{ $city }}
                        </option>
                    @endforeach
                </select>
                @error('city')
                    <span class="field-error">{{ $message }}</span>
                @enderror
            </div>

            <button type="submit" class="btn-submit">Create Account</button>
        </form>

        <p class="terms-note">
            By joining, you agree to our
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </p>

        <div class="trust-row">
            <span class="trust-item">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                Secure &amp; Encrypted
            </span>
            <span class="trust-item">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
                10K+ Nigerians
            </span>
            <span class="trust-item">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Vetted Talent
            </span>
        </div>
    </div>
</div>

{{-- ── FOOTER ── --}}
<footer>
    <div class="site-footer">
        <div>
            <div class="footer-brand">ServiceConnect</div>
            <p class="footer-tagline">Nigeria's premier digital guild connecting households with professional artisans. Quality service, guaranteed.</p>
            <p class="footer-copy">© {{ date('Y') }} ServiceConnect Nigeria. The Digital Guild.</p>
        </div>
        <ul class="footer-links">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
        </ul>
        <ul class="footer-links">
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Contact</a></li>
        </ul>
    </div>
</footer>

<script>
function selectRole(role) {
    document.getElementById('roleInput').value = role;
    document.querySelectorAll('.role-btn').forEach(btn => btn.classList.remove('active'));
    event.currentTarget.classList.add('active');
}

function togglePassword(id, btn) {
    const input = document.getElementById(id);
    const isHidden = input.type === 'password';
    input.type = isHidden ? 'text' : 'password';
    // Mirror value to confirm field for Laravel validation
    document.getElementById('password_confirmation').value = input.value;
    btn.innerHTML = isHidden
        ? `<svg width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`
        : `<svg width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>`;
}

function updateStrength(val) {
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    for (let i = 1; i <= 4; i++) {
        document.getElementById('bar' + i).classList.toggle('active', i <= score);
    }
    // Keep confirm in sync
    document.getElementById('password_confirmation').value = val;
}
</script>
@endsection