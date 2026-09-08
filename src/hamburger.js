// Add this to your App.jsx file in the useEffect section

  // Hamburger menu functionality
  useEffect(() => {
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (hamburger && mobileNav) {
      hamburger.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        
        // Animate hamburger lines
        hamburger.classList.toggle('active');
      });
      
      // Close menu when clicking on a link
      const navLinks = mobileNav.querySelectorAll('a');
      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobileNav.classList.remove('active');
          hamburger.classList.remove('active');
        });
      });
    }
    
    return () => {
      if (hamburger && mobileNav) {
        hamburger.removeEventListener('click', () => {});
        navLinks.forEach(link => {
          link.removeEventListener('click', () => {});
        });
      }
    };
  }, []);