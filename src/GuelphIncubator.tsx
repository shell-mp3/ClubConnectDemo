import React, { useState } from 'react';
import { Users, Lightbulb, BookOpen, ChevronRight, Plus, Calendar, Mail, Github, Linkedin, Star, Award, Send, FileText, Target, Clock, CheckCircle, X, Bell, MessageSquare, TrendingUp, Zap, Coffee, Rocket, GraduationCap, Briefcase, Heart, Activity, BarChart3, Search, Filter, MapPin, Video, Phone } from 'lucide-react';


// Animated background component
const FloatingOrbs = () => (
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
    <div className="absolute w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
    <div className="absolute w-72 h-72 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000 top-0 right-0"></div>
    <div className="absolute w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000 bottom-20 left-20"></div>
  </div>
);


// A reusable styled button
const GradientButton = ({ onClick, children, className = '' }) => (
  <button
    onClick={onClick}
    className={`bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold transform hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out shadow-lg hover:shadow-cyan-500/50 btn-press ${className}`}
  >
    {children}
  </button>
);


// A reusable glassmorphism card component
const GlassCard = ({ children, className = '' }) => (
  <div className={`bg-slate-800/40 backdrop-blur-lg border border-slate-200/20 rounded-xl shadow-2xl p-8 glass-hover animate-fade-in ${className}`}>
    {children}
  </div>
);


// A reusable main layout container
const MainContainer = ({ children }) => (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 text-slate-200 overflow-hidden">
      <FloatingOrbs />
      <div className="relative z-10">
        {children}
      </div>
    </div>
);




const GuelphIncubator = () => {
  const [currentView, setCurrentView] = useState('landing');
  const [currentUser, setCurrentUser] = useState(null);
  const [profiles, setProfiles] = useState([
    {
      id: 1,
      type: 'faculty',
      name: 'Dr. Sarah Chen',
      email: 'schen@uoguelph.ca',
      department: 'School of Computer Science',
      researchAreas: ['Machine Learning', 'Computer Vision', 'AI Ethics'],
      supervisionAvailable: true
    },
    {
      id: 2,
      type: 'student',
      name: 'Alex Rivera',
      email: 'arivera@uoguelph.ca',
      year: '3rd Year',
      program: 'Computer Science',
      skills: ['React', 'Python', 'Data Analysis'],
      resume: 'resume.pdf',
      clubs: ['Tech Club', 'Startup Society'],
      projects: ['Weather App', 'ML Predictor'],
      links: { github: 'github.com/alexr', linkedin: 'linkedin.com/in/alexr' }
    }
  ]);
  const [researchPosts, setResearchPosts] = useState([
    {
      id: 1,
      facultyId: 1,
      facultyName: 'Dr. Sarah Chen',
      title: 'Computer Vision for Agricultural Applications',
      description: 'Looking for 2 undergraduate students to work on drone imagery analysis for crop health monitoring.',
      type: 'USRA',
      duration: 'Fall 2025',
      skills: ['Python', 'OpenCV', 'Machine Learning'],
      posted: '2025-08-08',
      applications: 3
    }
  ]);
  const [startupPosts, setStartupPosts] = useState([
    {
      id: 1,
      studentId: 2,
      studentName: 'Alex Rivera',
      title: 'CampusConnect',
      pitch: 'A mobile app to help students find study groups and campus events in real-time. Think Tinder meets academic success!',
      skillsNeeded: ['Mobile Dev', 'UI/UX', 'Marketing'],
      contact: '@alexrivera_ug',
      posted: '2025-08-08',
      interested: 5,
      stage: 'idea',
      commitment: '10-15 hours/week'
    }
  ]);
  const [applications, setApplications] = useState([]);
  const [interests, setInterests] = useState([]);
  const [showResearchForm, setShowResearchForm] = useState(false);
  const [showStartupForm, setShowStartupForm] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(null);
  const [showIncubatorForm, setShowIncubatorForm] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  // Mentors view state
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [mentorSearchQuery, setMentorSearchQuery] = useState('');
  const [filterExpertise, setFilterExpertise] = useState('all');

  // Messages view state
  const [selectedConvoId, setSelectedConvoId] = useState(1);


  const handleLogin = (email, userType) => {
    const newUser = {
      id: Date.now(),
      email: email,
      type: userType,
      name: email.split('@')[0]
    };
    setCurrentUser(newUser);
    setCurrentView('dashboard');
  };


  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('landing');
  };


  const handleCreateProfile = (profileData) => {
    const newProfile = {
      ...profileData,
      id: Date.now(),
      email: currentUser.email,
      type: currentUser.type
    };
    setProfiles([...profiles, newProfile]);
    alert('Profile created successfully!');
    setCurrentView('dashboard');
  };


  const handlePostResearch = (researchData) => {
    const faculty = profiles.find(p => p.email === currentUser.email);
    const newPost = {
      ...researchData,
      id: Date.now(),
      facultyId: faculty?.id || currentUser.id,
      facultyName: faculty?.name || currentUser.name,
      posted: new Date().toISOString().split('T')[0],
      applications: 0
    };
    setResearchPosts([...researchPosts, newPost]);
    alert('Research opportunity posted!');
    setShowResearchForm(false);
  };


  const handlePostStartup = (startupData) => {
    const student = profiles.find(p => p.email === currentUser.email);
    const newPost = {
      ...startupData,
      id: Date.now(),
      studentId: student?.id || currentUser.id,
      studentName: student?.name || currentUser.name,
      posted: new Date().toISOString().split('T')[0],
      interested: 0
    };
    setStartupPosts([...startupPosts, newPost]);
    alert('Startup idea posted!');
    setShowStartupForm(false);
  };


  const handleApplyResearch = (postId, applicationData) => {
    const newApplication = {
      id: Date.now(),
      postId,
      applicantId: currentUser.id,
      applicantName: currentUser.name,
      type: 'research',
      ...applicationData,
      status: 'pending',
      submitted: new Date().toISOString()
    };
    setApplications([...applications, newApplication]);
    
    // Update application count
    setResearchPosts(researchPosts.map(p =>
      p.id === postId ? {...p, applications: p.applications + 1} : p
    ));
    
    alert('Application submitted successfully!');
    setShowApplicationForm(null);
  };


  const handleApplyIncubator = (startupId, applicationData) => {
    const newApplication = {
      id: Date.now(),
      startupId,
      applicantId: currentUser.id,
      applicantName: currentUser.name,
      type: 'incubator',
      ...applicationData,
      status: 'pending',
      cohort: 'Fall 2025',
      submitted: new Date().toISOString()
    };
    setApplications([...applications, newApplication]);
    alert('Incubator application submitted! We\'ll review it soon.');
    setShowIncubatorForm(null);
  };


  const handleInterest = (postId, message) => {
    const newInterest = {
      id: Date.now(),
      postId,
      userId: currentUser.id,
      userName: currentUser.name,
      message: message || '',
      timestamp: new Date().toISOString()
    };
    setInterests([...interests, newInterest]);
    
    setStartupPosts(startupPosts.map(p =>
      p.id === postId ? {...p, interested: p.interested + 1} : p
    ));
  };
 
  // Landing Page
  if (currentView === 'landing') {
    return (
      <MainContainer>
        <nav className="bg-transparent">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
              <img src="/socis-logo.png" alt="SOCIS" className="h-14 w-auto mr-2" />
              <span className="font-bold text-2xl text-white">ClubConnect</span>
              </div>
              <GradientButton onClick={() => setCurrentView('login')}>
                Login / Sign Up
              </GradientButton>
            </div>
          </div>
        </nav>


        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
            {/* Demo Banner */}
            <div className="mb-8 animate-fade-in">
              <span className="inline-flex items-center gap-2 bg-yellow-500/20 border border-yellow-400/30 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                Demo Version - Official release under academic revision
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
                <span className="bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent animate-gradient">
                    ClubConnect
                </span>
            </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto animate-fade-in animation-delay-200">
          A unified platform for U of G Computer Science and Software Engineering students to collaborate on innovative projects, join research labs, and connect with talented peers. Proudly supported by SOCIS.
          </p>

          <div className="mt-12 animate-fade-in animation-delay-400">
             <GradientButton onClick={() => setCurrentView('login')} className="px-10 py-4 text-lg animate-glow">
                Get Started Now
             </GradientButton>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid md:grid-cols-2 gap-8">
                <GlassCard>
                  <div className="flex items-center mb-4">
                    <BookOpen className="h-10 w-10 text-cyan-400 mr-4" />
                    <h2 className="text-2xl font-bold text-white">Research Matchmaking</h2>
                  </div>
                  <p className="text-slate-300 mb-6">
                    Discover and connect with faculty for volunteer USRA positions, thesis projects, and research assistant opportunities.
                  </p>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex items-center"><ChevronRight className="h-5 w-5 mr-2 text-cyan-400" />Browse available research positions</li>
                    <li className="flex items-center"><ChevronRight className="h-5 w-5 mr-2 text-cyan-400" />Create detailed academic profiles</li>
                    <li className="flex items-center"><ChevronRight className="h-5 w-5 mr-2 text-cyan-400" />Simplified, direct faculty connections</li>
                  </ul>
                </GlassCard>


                <GlassCard>
                   <div className="flex items-center mb-4">
                    <Users className="h-10 w-10 text-pink-500 mr-4" />
                    <h2 className="text-2xl font-bold text-white">Startup Incubator</h2>
                  </div>
                  <p className="text-slate-300 mb-6">
                    Launch your venture. Find co-founders, join our semester-long incubator, and compete for cash prizes.
                  </p>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex items-center"><ChevronRight className="h-5 w-5 mr-2 text-pink-500" />Post and discover startup ideas on our public board</li>
                    <li className="flex items-center"><ChevronRight className="h-5 w-5 mr-2 text-pink-500" />Join competitive, milestone-driven cohorts</li>
                    <li className="flex items-center"><ChevronRight className="h-5 w-5 mr-2 text-pink-500" />Access microgrants to cover project costs</li>
                    <li className="flex items-center"><ChevronRight className="h-5 w-5 mr-2 text-pink-500" />Compete for an end-of-term prize pool</li>
                  </ul>
                </GlassCard>
            </div>
        </div>
      </MainContainer>
    );
  }

  

  // Login Page
  if (currentView === 'login') {
    return <LoginView onLogin={handleLogin} onBack={() => setCurrentView('landing')} />;
  }
 
  const DashboardNav = () => (
    <nav className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-8">
            <div className="flex items-center cursor-pointer" onClick={() => setCurrentView('dashboard')}>
              <img src="/socis-logo.png" alt="SOCIS" className="h-10 w-auto mr-2" />
              <span className="font-bold text-xl bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">ClubConnect</span>
            </div>
            <div className="hidden md:flex items-center gap-1">
              <button onClick={() => setCurrentView('dashboard')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${currentView === 'dashboard' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
                Dashboard
              </button>
              <button onClick={() => setCurrentView('research')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${currentView === 'research' ? 'bg-cyan-500/20 text-cyan-400' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
                Research
              </button>
              <button onClick={() => setCurrentView('startups')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${currentView === 'startups' ? 'bg-pink-500/20 text-pink-400' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
                Startups
              </button>
              <button onClick={() => setCurrentView('mentors')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${currentView === 'mentors' ? 'bg-purple-500/20 text-purple-400' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
                Mentors
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setCurrentView('messages')} className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all">
              <MessageSquare className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">3</span>
            </button>
            <button className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-cyan-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">5</span>
            </button>
            <div className="h-6 w-px bg-slate-700 mx-2"></div>
            <button onClick={() => setCurrentView('profile')} className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-all">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                {currentUser?.name?.charAt(0) || 'U'}
              </div>
              <span className="text-slate-300 text-sm hidden sm:block">{currentUser?.name}</span>
            </button>
            <button
              onClick={handleLogout}
              className="text-slate-500 hover:text-red-400 transition-colors text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );




  // Dashboard
  if (currentView === 'dashboard') {
    const userProfile = profiles.find(p => p.email === currentUser?.email);
    const userApplications = applications.filter(a => a.applicantId === currentUser?.id);

    return (
        <MainContainer>
          <DashboardNav />
          <div className="max-w-7xl mx-auto px-4 py-6">
            {/* Welcome Banner */}
            {!userProfile && (
              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 rounded-xl p-4 mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Zap className="h-6 w-6 text-yellow-400" />
                  <p className="text-yellow-200">Welcome! Complete your profile to unlock all features.</p>
                </div>
                <button onClick={() => setCurrentView('profile')} className="bg-yellow-500/30 hover:bg-yellow-500/50 text-yellow-200 px-4 py-2 rounded-lg text-sm font-medium transition-all">
                  Create Profile
                </button>
              </div>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 stagger-children">
              <button onClick={() => setCurrentView('project')} className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 backdrop-blur-lg border border-cyan-400/20 rounded-xl p-4 hover:border-cyan-400/40 transition-all text-left card-lift">
                <div className="flex items-center justify-between mb-2">
                  <Rocket className="h-5 w-5 text-cyan-400 animate-float" />
                  <span className="text-xs text-cyan-400 font-medium">+2 this week</span>
                </div>
                <p className="text-2xl font-bold text-white">3</p>
                <p className="text-sm text-slate-400">Active Projects</p>
              </button>
              <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 backdrop-blur-lg border border-purple-400/20 rounded-xl p-4 hover:border-purple-400/40 transition-all card-lift">
                <div className="flex items-center justify-between mb-2">
                  <FileText className="h-5 w-5 text-purple-400" />
                  <span className="text-xs text-yellow-400 font-medium">2 pending</span>
                </div>
                <p className="text-2xl font-bold text-white">{userApplications.length || 5}</p>
                <p className="text-sm text-slate-400">Applications</p>
              </div>
              <div className="bg-gradient-to-br from-pink-500/20 to-pink-600/10 backdrop-blur-lg border border-pink-400/20 rounded-xl p-4 hover:border-pink-400/40 transition-all card-lift">
                <div className="flex items-center justify-between mb-2">
                  <Calendar className="h-5 w-5 text-pink-400" />
                  <span className="text-xs text-pink-400 font-medium">Tomorrow</span>
                </div>
                <p className="text-2xl font-bold text-white">2</p>
                <p className="text-sm text-slate-400">Upcoming Events</p>
              </div>
              <button onClick={() => setCurrentView('messages')} className="bg-gradient-to-br from-green-500/20 to-green-600/10 backdrop-blur-lg border border-green-400/20 rounded-xl p-4 hover:border-green-400/40 transition-all card-lift text-left">
                <div className="flex items-center justify-between mb-2">
                  <MessageSquare className="h-5 w-5 text-green-400" />
                  <span className="text-xs text-green-400 font-medium">3 new</span>
                </div>
                <p className="text-2xl font-bold text-white">8</p>
                <p className="text-sm text-slate-400">Messages</p>
              </button>
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button onClick={() => setCurrentView('startups')} className="group bg-gradient-to-br from-cyan-500 to-purple-600 p-4 rounded-xl text-left hover:scale-105 transition-all shadow-lg hover:shadow-cyan-500/30">
                  <Plus className="h-6 w-6 text-white mb-2 group-hover:rotate-90 transition-transform" />
                  <p className="font-semibold text-white">Create Project</p>
                  <p className="text-xs text-cyan-100">Start something new</p>
                </button>
                <button onClick={() => setCurrentView('research')} className="group bg-slate-800/60 backdrop-blur-lg border border-slate-200/20 p-4 rounded-xl text-left hover:border-cyan-400/50 transition-all">
                  <Search className="h-6 w-6 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
                  <p className="font-semibold text-white">Browse Opportunities</p>
                  <p className="text-xs text-slate-400">Find research positions</p>
                </button>
                <button onClick={() => setCurrentView('mentors')} className="group bg-slate-800/60 backdrop-blur-lg border border-slate-200/20 p-4 rounded-xl text-left hover:border-purple-400/50 transition-all">
                  <GraduationCap className="h-6 w-6 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                  <p className="font-semibold text-white">Find Mentors</p>
                  <p className="text-xs text-slate-400">Connect with experts</p>
                </button>
                <button onClick={() => setCurrentView('profile')} className="group bg-slate-800/60 backdrop-blur-lg border border-slate-200/20 p-4 rounded-xl text-left hover:border-pink-400/50 transition-all">
                  <Users className="h-6 w-6 text-pink-400 mb-2 group-hover:scale-110 transition-transform" />
                  <p className="font-semibold text-white">Edit Profile</p>
                  <p className="text-xs text-slate-400">Update your info</p>
                </button>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Column - Activity Feed */}
              <div className="lg:col-span-2 space-y-6">
                {/* Incubator Promo */}
                <div className="bg-gradient-to-br from-purple-600/30 to-pink-500/20 backdrop-blur-lg border border-purple-400/30 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-xl text-white mb-1">Incubator Cohort - Fall 2025</h3>
                      <p className="text-purple-200 text-sm">Applications now open!</p>
                    </div>
                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-semibold">Open</span>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-white/5 rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-yellow-400">$250</p>
                      <p className="text-xs text-slate-300">Microgrants</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-cyan-400">$1,750</p>
                      <p className="text-xs text-slate-300">Total Prizes</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 text-center">
                      <p className="text-2xl font-bold text-pink-400">12</p>
                      <p className="text-xs text-slate-300">Weeks</p>
                    </div>
                  </div>
                  <button onClick={() => setCurrentView('startups')} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2.5 rounded-lg font-semibold hover:opacity-90 transition-all">
                    Apply Now
                  </button>
                </div>

                {/* Recent Activity */}
                <GlassCard>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg text-white">Recent Activity</h3>
                    <Activity className="h-5 w-5 text-slate-400" />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 bg-slate-700/30 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                        <BookOpen className="h-4 w-4 text-cyan-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-white">New research position posted by <span className="text-cyan-400">Dr. Sarah Chen</span></p>
                        <p className="text-xs text-slate-400 mt-1">Computer Vision for Agriculture - 2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-slate-700/30 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-white">Your application to <span className="text-green-400">ML Research</span> was accepted!</p>
                        <p className="text-xs text-slate-400 mt-1">5 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-slate-700/30 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                        <Heart className="h-4 w-4 text-pink-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-white"><span className="text-pink-400">3 students</span> are interested in CampusConnect</p>
                        <p className="text-xs text-slate-400 mt-1">Yesterday</p>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </div>

              {/* Right Column - Sidebar */}
              <div className="space-y-6">
                {/* Upcoming Deadlines */}
                <GlassCard className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-white">Upcoming Deadlines</h3>
                    <Clock className="h-5 w-5 text-slate-400" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-10 bg-red-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">USRA Application</p>
                        <p className="text-xs text-red-400">Tomorrow, 5:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-10 bg-yellow-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">Project Milestone</p>
                        <p className="text-xs text-yellow-400">Dec 20, 11:59 PM</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-1 h-10 bg-cyan-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">Incubator Check-in</p>
                        <p className="text-xs text-cyan-400">Dec 22, 2:00 PM</p>
                      </div>
                    </div>
                  </div>
                </GlassCard>

                {/* My Applications */}
                <GlassCard className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-white">My Applications</h3>
                    <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full">{userApplications.length || 3}</span>
                  </div>
                  <div className="space-y-3">
                    {(userApplications.length > 0 ? userApplications.slice(0, 3) : [
                      { id: 1, type: 'research', status: 'pending' },
                      { id: 2, type: 'incubator', status: 'accepted' },
                      { id: 3, type: 'research', status: 'pending' }
                    ]).map(app => (
                      <div key={app.id} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                        <div className="flex items-center gap-2">
                          {app.type === 'research' ?
                            <BookOpen className="h-4 w-4 text-cyan-400" /> :
                            <Rocket className="h-4 w-4 text-pink-400" />
                          }
                          <span className="text-sm text-slate-200 capitalize">{app.type}</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          app.status === 'pending' ? 'bg-yellow-400/20 text-yellow-300' :
                          app.status === 'accepted' ? 'bg-green-400/20 text-green-300' :
                          'bg-gray-400/20 text-gray-300'
                        }`}>
                          {app.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                {/* Recommended Mentors */}
                <GlassCard className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-white">Recommended Mentors</h3>
                    <button onClick={() => setCurrentView('mentors')} className="text-xs text-cyan-400 hover:text-cyan-300">View all</button>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-2 hover:bg-slate-700/30 rounded-lg transition-all cursor-pointer">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white font-bold">SC</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">Dr. Sarah Chen</p>
                        <p className="text-xs text-slate-400">ML, Computer Vision</p>
                      </div>
                      <div className="flex items-center text-yellow-400">
                        <Star className="h-3 w-3 fill-current" />
                        <span className="text-xs ml-1">4.9</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-2 hover:bg-slate-700/30 rounded-lg transition-all cursor-pointer">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-orange-500 flex items-center justify-center text-white font-bold">JM</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">Prof. James Miller</p>
                        <p className="text-xs text-slate-400">Startups, Product</p>
                      </div>
                      <div className="flex items-center text-yellow-400">
                        <Star className="h-3 w-3 fill-current" />
                        <span className="text-xs ml-1">4.8</span>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </MainContainer>
      );
  }


  // Profile View
  if (currentView === 'profile') {
    const userProfile = profiles.find(p => p.email === currentUser?.email);
    return (
      <ProfileView
        currentUser={currentUser}
        userProfile={userProfile}
        onBack={() => setCurrentView('dashboard')}
        onCreateProfile={handleCreateProfile}
      />
    );
  }


  // Research View
  if (currentView === 'research') {
    return (
      <ResearchView
        currentUser={currentUser}
        researchPosts={researchPosts}
        showForm={showResearchForm}
        onToggleForm={setShowResearchForm}
        onPostResearch={handlePostResearch}
        showApplicationForm={showApplicationForm}
        onToggleApplicationForm={setShowApplicationForm}
        onApplyResearch={handleApplyResearch}
        onBack={() => setCurrentView('dashboard')}
      />
    );
  }


  // Startups View
  if (currentView === 'startups') {
    return (
      <StartupsView
        currentUser={currentUser}
        startupPosts={startupPosts}
        showForm={showStartupForm}
        onToggleForm={setShowStartupForm}
        onPostStartup={handlePostStartup}
        showIncubatorForm={showIncubatorForm}
        onToggleIncubatorForm={setShowIncubatorForm}
        onApplyIncubator={handleApplyIncubator}
        onInterest={handleInterest}
        onBack={() => setCurrentView('dashboard')}
      />
    );
  }

  // Mentors View
  if (currentView === 'mentors') {
    const mentors = [
      {
        id: 1,
        name: 'Dr. Sarah Chen',
        title: 'Associate Professor',
        department: 'School of Computer Science',
        expertise: ['Machine Learning', 'Computer Vision', 'AI Ethics'],
        rating: 4.9,
        reviews: 24,
        availability: 'Mon, Wed 2-4 PM',
        image: 'SC',
        gradient: 'from-cyan-400 to-purple-500',
        bio: 'Expert in deep learning and computer vision with 10+ years of research experience.',
        slots: [
          { day: 'Mon', time: '2:00 PM', available: true },
          { day: 'Mon', time: '3:00 PM', available: false },
          { day: 'Wed', time: '2:00 PM', available: true },
          { day: 'Wed', time: '3:00 PM', available: true },
        ]
      },
      {
        id: 2,
        name: 'Prof. James Miller',
        title: 'Entrepreneur in Residence',
        department: 'Lang School of Business',
        expertise: ['Startups', 'Product Strategy', 'Fundraising'],
        rating: 4.8,
        reviews: 31,
        availability: 'Tue, Thu 10 AM - 12 PM',
        image: 'JM',
        gradient: 'from-pink-400 to-orange-500',
        bio: 'Founded 3 successful startups. Passionate about helping students launch ventures.',
        slots: [
          { day: 'Tue', time: '10:00 AM', available: true },
          { day: 'Tue', time: '11:00 AM', available: true },
          { day: 'Thu', time: '10:00 AM', available: false },
          { day: 'Thu', time: '11:00 AM', available: true },
        ]
      },
      {
        id: 3,
        name: 'Dr. Emily Rodriguez',
        title: 'Senior Lecturer',
        department: 'School of Engineering',
        expertise: ['Systems Design', 'IoT', 'Embedded Systems'],
        rating: 4.7,
        reviews: 18,
        availability: 'Fri 1-5 PM',
        image: 'ER',
        gradient: 'from-green-400 to-cyan-500',
        bio: 'Hardware meets software. Specializes in IoT solutions and embedded programming.',
        slots: [
          { day: 'Fri', time: '1:00 PM', available: true },
          { day: 'Fri', time: '2:00 PM', available: true },
          { day: 'Fri', time: '3:00 PM', available: false },
          { day: 'Fri', time: '4:00 PM', available: true },
        ]
      },
      {
        id: 4,
        name: 'Alex Thompson',
        title: 'Industry Mentor',
        department: 'Google Canada',
        expertise: ['Full-Stack Development', 'Cloud Architecture', 'DevOps'],
        rating: 4.9,
        reviews: 42,
        availability: 'Sat 10 AM - 2 PM',
        image: 'AT',
        gradient: 'from-purple-400 to-pink-500',
        bio: 'Senior SWE at Google. Loves mentoring the next generation of developers.',
        slots: [
          { day: 'Sat', time: '10:00 AM', available: false },
          { day: 'Sat', time: '11:00 AM', available: true },
          { day: 'Sat', time: '12:00 PM', available: true },
          { day: 'Sat', time: '1:00 PM', available: true },
        ]
      }
    ];

    const allExpertise = Array.from(new Set(mentors.flatMap(m => m.expertise)));

    const filteredMentors = mentors.filter(mentor => {
      const matchesSearch = mentor.name.toLowerCase().includes(mentorSearchQuery.toLowerCase()) ||
        mentor.expertise.some(e => e.toLowerCase().includes(mentorSearchQuery.toLowerCase()));
      const matchesFilter = filterExpertise === 'all' || mentor.expertise.includes(filterExpertise);
      return matchesSearch && matchesFilter;
    });

    return (
      <MainContainer>
        <DashboardNav />
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Find a Mentor
            </h1>
            <p className="text-slate-400">Connect with experienced professionals and faculty to accelerate your growth</p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search mentors by name or expertise..."
                value={mentorSearchQuery}
                onChange={(e) => setMentorSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800/60 backdrop-blur-lg border border-slate-200/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-200"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-slate-400" />
              <select
                value={filterExpertise}
                onChange={(e) => setFilterExpertise(e.target.value)}
                className="px-4 py-3 bg-slate-800/60 backdrop-blur-lg border border-slate-200/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-200"
              >
                <option value="all">All Expertise</option>
                {allExpertise.map(exp => (
                  <option key={exp} value={exp}>{exp}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Mentors Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredMentors.map(mentor => (
              <GlassCard key={mentor.id} className="hover:border-purple-400/40 transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${mentor.gradient} flex items-center justify-center text-white font-bold text-xl flex-shrink-0`}>
                    {mentor.image}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{mentor.name}</h3>
                        <p className="text-sm text-purple-400">{mentor.title}</p>
                        <p className="text-xs text-slate-400">{mentor.department}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-yellow-400/20 px-2 py-1 rounded-lg">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-semibold text-yellow-400">{mentor.rating}</span>
                        <span className="text-xs text-slate-400">({mentor.reviews})</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-slate-300 mb-4">{mentor.bio}</p>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {mentor.expertise.map((exp, idx) => (
                    <span key={idx} className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs">
                      {exp}
                    </span>
                  ))}
                </div>

                {/* Office Hours */}
                <div className="flex items-center gap-2 mb-4 text-sm">
                  <Clock className="h-4 w-4 text-cyan-400" />
                  <span className="text-slate-300">Office Hours: <span className="text-cyan-400">{mentor.availability}</span></span>
                </div>

                {/* Available Slots Calendar */}
                <div className="bg-slate-700/30 rounded-lg p-4 mb-4">
                  <h4 className="text-sm font-semibold text-white mb-3">Available Slots</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {mentor.slots.map((slot, idx) => (
                      <button
                        key={idx}
                        disabled={!slot.available}
                        onClick={() => {
                          setSelectedMentor(mentor);
                          setSelectedSlot(slot);
                        }}
                        className={`p-2 rounded-lg text-xs font-medium transition-all ${
                          slot.available
                            ? 'bg-green-500/20 text-green-300 hover:bg-green-500/30 cursor-pointer'
                            : 'bg-slate-600/30 text-slate-500 cursor-not-allowed'
                        } ${selectedMentor?.id === mentor.id && selectedSlot === slot ? 'ring-2 ring-green-400' : ''}`}
                      >
                        {slot.day} {slot.time}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => alert(`Booking session with ${mentor.name}!`)}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2.5 rounded-lg font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2"
                  >
                    <Calendar className="h-4 w-4" />
                    Book Session
                  </button>
                  <button
                    onClick={() => setCurrentView('messages')}
                    className="p-2.5 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-all"
                  >
                    <MessageSquare className="h-5 w-5 text-slate-300" />
                  </button>
                  <button className="p-2.5 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-all">
                    <Video className="h-5 w-5 text-slate-300" />
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>

          {/* Empty State */}
          {filteredMentors.length === 0 && (
            <div className="text-center py-12">
              <GraduationCap className="h-16 w-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No mentors found</h3>
              <p className="text-slate-400">Try adjusting your search or filters</p>
            </div>
          )}

          {/* Booking Modal */}
          {selectedMentor && selectedSlot && (
            <Modal onBackdropClick={() => { setSelectedMentor(null); setSelectedSlot(null); }}>
              <div className="text-center mb-6">
                <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${selectedMentor.gradient} flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4`}>
                  {selectedMentor.image}
                </div>
                <h3 className="text-2xl font-bold text-white">{selectedMentor.name}</h3>
                <p className="text-purple-400">{selectedMentor.title}</p>
              </div>

              <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center gap-3">
                  <Calendar className="h-5 w-5 text-green-400" />
                  <span className="text-green-300 font-semibold">{selectedSlot.day} at {selectedSlot.time}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-slate-300 mb-2 font-semibold">What would you like to discuss?</label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe your questions or topics..."
                    className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-2 font-semibold">Meeting Preference</label>
                  <div className="flex gap-3">
                    <button className="flex-1 flex items-center justify-center gap-2 p-3 bg-purple-500/20 border border-purple-400/30 rounded-lg text-purple-300 hover:bg-purple-500/30 transition-all">
                      <Video className="h-4 w-4" /> Video Call
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 p-3 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-700 transition-all">
                      <MapPin className="h-4 w-4" /> In Person
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    alert(`Session booked with ${selectedMentor.name} for ${selectedSlot.day} at ${selectedSlot.time}!`);
                    setSelectedMentor(null);
                    setSelectedSlot(null);
                  }}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-all"
                >
                  Confirm Booking
                </button>
                <button
                  onClick={() => { setSelectedMentor(null); setSelectedSlot(null); }}
                  className="px-6 py-3 text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
              </div>
            </Modal>
          )}
        </div>
      </MainContainer>
    );
  }

  // Project Detail View
  if (currentView === 'project') {
    const project = {
      id: 1,
      name: 'CampusConnect',
      tagline: 'Find study groups and campus events in real-time',
      description: 'CampusConnect is a mobile app designed to help University of Guelph students discover study groups, campus events, and connect with peers who share similar academic interests. Think Tinder meets academic success!',
      stage: 'prototype',
      startDate: 'Sep 2025',
      cohort: 'Fall 2025 Incubator',
      progress: 65,
      team: [
        { name: 'Alex Rivera', role: 'Founder & CEO', avatar: 'AR', gradient: 'from-pink-400 to-orange-500' },
        { name: 'Jordan Lee', role: 'CTO', avatar: 'JL', gradient: 'from-cyan-400 to-blue-500' },
        { name: 'Sam Patel', role: 'Designer', avatar: 'SP', gradient: 'from-purple-400 to-pink-500' },
      ],
      milestones: [
        { id: 1, title: 'Project Kickoff', date: 'Sep 5', status: 'completed', description: 'Initial team formation and idea validation' },
        { id: 2, title: 'User Research', date: 'Sep 20', status: 'completed', description: 'Survey 100+ students about study habits' },
        { id: 3, title: 'MVP Design', date: 'Oct 10', status: 'completed', description: 'Complete UI/UX mockups in Figma' },
        { id: 4, title: 'Core Features', date: 'Nov 1', status: 'in_progress', description: 'Build matching algorithm and chat system' },
        { id: 5, title: 'Beta Launch', date: 'Nov 20', status: 'pending', description: 'Launch to 50 beta users' },
        { id: 6, title: 'Demo Day', date: 'Dec 15', status: 'pending', description: 'Present to judges and investors' },
      ],
      tasks: [
        { id: 1, title: 'Implement matching algorithm', assignee: 'JL', priority: 'high', status: 'in_progress' },
        { id: 2, title: 'Design onboarding flow', assignee: 'SP', priority: 'medium', status: 'completed' },
        { id: 3, title: 'Set up Firebase backend', assignee: 'JL', priority: 'high', status: 'completed' },
        { id: 4, title: 'Create marketing landing page', assignee: 'AR', priority: 'low', status: 'pending' },
        { id: 5, title: 'User testing sessions', assignee: 'SP', priority: 'medium', status: 'pending' },
      ],
      updates: [
        { date: 'Nov 15', content: 'Completed user authentication flow and basic profile setup.' },
        { date: 'Nov 10', content: 'Mentor feedback: Focus on core matching before adding chat.' },
        { date: 'Nov 5', content: 'First weekly check-in. On track for November milestone!' },
      ],
      links: {
        github: 'github.com/campusconnect',
        figma: 'figma.com/file/campusconnect',
        demo: 'campusconnect-demo.vercel.app'
      }
    };

    return (
      <MainContainer>
        <DashboardNav />
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Back Button */}
          <button
            onClick={() => setCurrentView('dashboard')}
            className="flex items-center text-slate-400 hover:text-white mb-6 transition-colors"
          >
            <ChevronRight className="h-4 w-4 rotate-180 mr-1" />
            Back to Dashboard
          </button>

          {/* Project Header */}
          <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-lg border border-pink-400/30 rounded-xl p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-white">{project.name}</h1>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    project.stage === 'idea' ? 'bg-yellow-400/20 text-yellow-300' :
                    project.stage === 'prototype' ? 'bg-blue-400/20 text-blue-300' :
                    project.stage === 'mvp' ? 'bg-green-400/20 text-green-300' :
                    'bg-purple-400/20 text-purple-300'
                  }`}>{project.stage}</span>
                </div>
                <p className="text-lg text-pink-200">{project.tagline}</p>
                <div className="flex items-center gap-4 mt-3 text-sm text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Started {project.startDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <Award className="h-4 w-4 text-purple-400" />
                    {project.cohort}
                  </span>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-all flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  Code
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg hover:opacity-90 transition-all flex items-center gap-2 text-white font-semibold">
                  <Rocket className="h-4 w-4" />
                  View Demo
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-300">Overall Progress</span>
                <span className="text-sm font-semibold text-pink-400">{project.progress}%</span>
              </div>
              <div className="h-2 bg-slate-700/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* About */}
              <GlassCard>
                <h2 className="text-lg font-semibold text-white mb-4">About</h2>
                <p className="text-slate-300 leading-relaxed">{project.description}</p>
              </GlassCard>

              {/* Milestones Timeline */}
              <GlassCard>
                <h2 className="text-lg font-semibold text-white mb-6">Milestones</h2>
                <div className="space-y-4">
                  {project.milestones.map((milestone, idx) => (
                    <div key={milestone.id} className="flex gap-4">
                      {/* Timeline Line */}
                      <div className="flex flex-col items-center">
                        <div className={`w-4 h-4 rounded-full flex-shrink-0 ${
                          milestone.status === 'completed' ? 'bg-green-500' :
                          milestone.status === 'in_progress' ? 'bg-cyan-500 animate-pulse' :
                          'bg-slate-600'
                        }`} />
                        {idx < project.milestones.length - 1 && (
                          <div className={`w-0.5 flex-1 mt-1 ${
                            milestone.status === 'completed' ? 'bg-green-500/50' : 'bg-slate-700'
                          }`} />
                        )}
                      </div>
                      {/* Content */}
                      <div className="flex-1 pb-6">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-white">{milestone.title}</h3>
                          <span className="text-xs text-slate-400">{milestone.date}</span>
                        </div>
                        <p className="text-sm text-slate-400">{milestone.description}</p>
                        {milestone.status === 'in_progress' && (
                          <span className="inline-block mt-2 px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-full">
                            In Progress
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Tasks */}
              <GlassCard>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white">Tasks</h2>
                  <button className="text-sm text-cyan-400 hover:text-cyan-300">+ Add Task</button>
                </div>
                <div className="space-y-3">
                  {project.tasks.map(task => (
                    <div key={task.id} className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                        task.status === 'completed'
                          ? 'bg-green-500 border-green-500'
                          : task.status === 'in_progress'
                          ? 'border-cyan-500'
                          : 'border-slate-500'
                      }`}>
                        {task.status === 'completed' && <CheckCircle className="h-3 w-3 text-white" />}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm ${task.status === 'completed' ? 'text-slate-400 line-through' : 'text-white'}`}>
                          {task.title}
                        </p>
                      </div>
                      <span className="text-xs text-slate-400">{task.assignee}</span>
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        task.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                        task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-slate-500/20 text-slate-300'
                      }`}>{task.priority}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Team */}
              <GlassCard className="p-5">
                <h2 className="text-lg font-semibold text-white mb-4">Team</h2>
                <div className="space-y-3">
                  {project.team.map((member, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white font-bold text-sm`}>
                        {member.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{member.name}</p>
                        <p className="text-xs text-slate-400">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 py-2 border border-dashed border-slate-600 rounded-lg text-slate-400 hover:text-white hover:border-slate-400 transition-all text-sm">
                  + Invite Member
                </button>
              </GlassCard>

              {/* Recent Updates */}
              <GlassCard className="p-5">
                <h2 className="text-lg font-semibold text-white mb-4">Recent Updates</h2>
                <div className="space-y-4">
                  {project.updates.map((update, idx) => (
                    <div key={idx} className="border-l-2 border-purple-500/50 pl-3">
                      <p className="text-xs text-purple-400 mb-1">{update.date}</p>
                      <p className="text-sm text-slate-300">{update.content}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Quick Links */}
              <GlassCard className="p-5">
                <h2 className="text-lg font-semibold text-white mb-4">Resources</h2>
                <div className="space-y-2">
                  <a href="#" className="flex items-center gap-3 p-2 hover:bg-slate-700/50 rounded-lg transition-all">
                    <Github className="h-4 w-4 text-slate-400" />
                    <span className="text-sm text-slate-300">GitHub Repository</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 p-2 hover:bg-slate-700/50 rounded-lg transition-all">
                    <FileText className="h-4 w-4 text-slate-400" />
                    <span className="text-sm text-slate-300">Figma Designs</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 p-2 hover:bg-slate-700/50 rounded-lg transition-all">
                    <Linkedin className="h-4 w-4 text-slate-400" />
                    <span className="text-sm text-slate-300">Live Demo</span>
                  </a>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </MainContainer>
    );
  }

  // Messages View
  if (currentView === 'messages') {
    const conversations = [
      {
        id: 1,
        name: 'Dr. Sarah Chen',
        avatar: 'SC',
        gradient: 'from-cyan-400 to-purple-500',
        lastMessage: 'Looking forward to our session tomorrow!',
        time: '2m ago',
        unread: 2
      },
      {
        id: 2,
        name: 'Alex Rivera',
        avatar: 'AR',
        gradient: 'from-pink-400 to-orange-500',
        lastMessage: 'Thanks for your interest in CampusConnect!',
        time: '1h ago',
        unread: 1
      },
      {
        id: 3,
        name: 'Incubator Team',
        avatar: 'IT',
        gradient: 'from-green-400 to-cyan-500',
        lastMessage: 'Reminder: Weekly check-in tomorrow at 3 PM',
        time: '3h ago',
        unread: 0
      }
    ];

    const selectedConvo = conversations.find(c => c.id === selectedConvoId) || conversations[0];

    const messages = [
      { id: 1, sender: 'them', text: 'Hi! I saw your application for the CV research position.', time: '10:30 AM' },
      { id: 2, sender: 'me', text: 'Yes! I\'m very excited about the opportunity to work on drone imagery analysis.', time: '10:32 AM' },
      { id: 3, sender: 'them', text: 'Great! Your background in Python and ML looks solid. Do you have experience with OpenCV?', time: '10:35 AM' },
      { id: 4, sender: 'me', text: 'I\'ve used it in a few personal projects. I built an object detection system for my capstone.', time: '10:37 AM' },
      { id: 5, sender: 'them', text: 'Perfect! Let\'s schedule a quick chat. Are you free tomorrow at 2 PM?', time: '10:40 AM' },
      { id: 6, sender: 'me', text: 'Yes, that works for me!', time: '10:41 AM' },
      { id: 7, sender: 'them', text: 'Looking forward to our session tomorrow!', time: '10:42 AM' },
    ];

    return (
      <MainContainer>
        <DashboardNav />
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid md:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
            {/* Conversations List */}
            <div className="md:col-span-1">
              <GlassCard className="h-full p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white">Messages</h2>
                  <button className="p-2 hover:bg-slate-700 rounded-lg transition-all">
                    <Plus className="h-5 w-5 text-slate-400" />
                  </button>
                </div>
                <div className="space-y-2">
                  {conversations.map(convo => (
                    <button
                      key={convo.id}
                      onClick={() => setSelectedConvoId(convo.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left ${
                        selectedConvo.id === convo.id ? 'bg-purple-500/20 border border-purple-400/30' : 'hover:bg-slate-700/50'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${convo.gradient} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                        {convo.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-white truncate">{convo.name}</p>
                          <span className="text-xs text-slate-400">{convo.time}</span>
                        </div>
                        <p className="text-sm text-slate-400 truncate">{convo.lastMessage}</p>
                      </div>
                      {convo.unread > 0 && (
                        <span className="bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                          {convo.unread}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </GlassCard>
            </div>

            {/* Chat Area */}
            <div className="md:col-span-2">
              <GlassCard className="h-full p-0 flex flex-col">
                {/* Chat Header */}
                <div className="flex items-center gap-3 p-4 border-b border-slate-200/10">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${selectedConvo.gradient} flex items-center justify-center text-white font-bold`}>
                    {selectedConvo.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white">{selectedConvo.name}</p>
                    <p className="text-xs text-green-400">Online</p>
                  </div>
                  <button className="p-2 hover:bg-slate-700 rounded-lg transition-all">
                    <Video className="h-5 w-5 text-slate-400" />
                  </button>
                  <button className="p-2 hover:bg-slate-700 rounded-lg transition-all">
                    <Phone className="h-5 w-5 text-slate-400" />
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] ${
                        msg.sender === 'me'
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                          : 'bg-slate-700/50 text-slate-200'
                      } rounded-2xl px-4 py-2`}>
                        <p className="text-sm">{msg.text}</p>
                        <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-purple-200' : 'text-slate-400'}`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-slate-200/10">
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-200"
                    />
                    <button className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl hover:opacity-90 transition-all">
                      <Send className="h-5 w-5 text-white" />
                    </button>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </MainContainer>
    );
  }


  return null;
};


// Generic Form Input
const FormInput = ({ label, ...props }) => (
    <div>
      <label className="block text-slate-300 mb-2 font-semibold">{label}</label>
      <input
        {...props}
        className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-200"
      />
    </div>
  );
  
  const FormTextArea = ({ label, ...props }) => (
    <div>
      <label className="block text-slate-300 mb-2 font-semibold">{label}</label>
      <textarea
        {...props}
        className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-200"
      />
    </div>
  );
  
  const FormSelect = ({ label, children, ...props }) => (
    <div>
      <label className="block text-slate-300 mb-2 font-semibold">{label}</label>
      <select
        {...props}
        className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-200"
      >
        {children}
      </select>
    </div>
  );


// Login Component
const LoginView = ({ onLogin, onBack }) => {
    const [email, setEmail] = useState('randomuser123@uoguelph.ca');
    const [userType, setUserType] = useState('student');
 
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 text-slate-200 flex items-center justify-center p-4">
        <FloatingOrbs />
        <div className="relative z-10 w-full max-w-md">
            <GlassCard>
                <div className="flex flex-col items-center justify-center mb-6">
                <img src="/socis-logo.png" alt="SOCIS" className="h-16 w-auto mr-2" />
                <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
                <p className="text-slate-400">Login to ClubConnect</p>
                </div>

                {/* Demo Notice */}
                <div className="bg-cyan-500/20 border border-cyan-400/30 rounded-lg p-3 mb-6">
                  <p className="text-sm text-cyan-300 text-center">
                    Demo Mode: Use the pre-filled credentials to explore
                  </p>
                </div>
                
                <div className="space-y-6">
                    <FormInput
                        label="University Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your.name@uoguelph.ca"
                    />
                
                    <FormSelect
                        label="I am a..."
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                    >
                        <option value="student">Student</option>
                        <option value="faculty">Faculty</option>
                    </FormSelect>
                </div>


                <GradientButton
                    onClick={() => email && onLogin(email, userType)}
                    className="w-full mt-8 py-3"
                >
                    Login
                </GradientButton>
                
                <button
                    onClick={onBack}
                    className="mt-6 text-slate-400 hover:text-white text-sm w-full transition-colors"
                >
                    ← Back to Home
                </button>
            </GlassCard>
        </div>
      </div>
    );
  };
  
  type Profile = {
      name: string;
      department?: string;
      researchAreas?: string[];
      supervisionAvailable?: boolean;
      year?: string;
      program?: string;
      skills?: string[];
      resume?: string;
      clubs?: string[];
      projects?: string[];
      links?: {
        github?: string;
        linkedin?: string;
      };
    };
    
// Profile Component
const ProfileView = ({ currentUser, userProfile, onBack, onCreateProfile }) => {
    const [formData, setFormData] = useState({
      name: '',
      department: '',
      researchAreas: '',
      supervisionAvailable: 'true',
      year: '',
      program: '',
      skills: '',
      resume: '',
      clubs: '',
      projects: '',
      github: '',
      linkedin: ''
    });

    // Sample achievements
    const achievements = [
      { id: 1, title: 'Early Adopter', description: 'Joined during beta launch', icon: '🚀', color: 'from-cyan-400 to-blue-500' },
      { id: 2, title: 'Team Player', description: 'Joined 3+ projects', icon: '🤝', color: 'from-pink-400 to-purple-500' },
      { id: 3, title: 'Mentor Connect', description: 'Booked 5 mentor sessions', icon: '🎓', color: 'from-yellow-400 to-orange-500' },
      { id: 4, title: 'First Milestone', description: 'Completed first project milestone', icon: '✨', color: 'from-green-400 to-cyan-500' },
    ];

    // Sample portfolio projects
    const portfolioProjects = [
      { id: 1, name: 'Weather Dashboard', description: 'Real-time weather app with React', tech: ['React', 'API', 'CSS'], gradient: 'from-cyan-500 to-blue-500' },
      { id: 2, name: 'ML Stock Predictor', description: 'Stock price prediction using LSTM', tech: ['Python', 'TensorFlow', 'Pandas'], gradient: 'from-purple-500 to-pink-500' },
      { id: 3, name: 'Campus Events App', description: 'Event discovery for students', tech: ['React Native', 'Firebase'], gradient: 'from-pink-500 to-orange-500' },
    ];

    // Stats
    const stats = [
      { label: 'Projects', value: 3, icon: Rocket },
      { label: 'Connections', value: 24, icon: Users },
      { label: 'Achievements', value: 4, icon: Award },
      { label: 'Sessions', value: 7, icon: Coffee },
    ];

    const handleSubmit = () => {

        interface ProfileData {
    name: string;
    department?: string;
    researchAreas?: string[];
    supervisionAvailable?: boolean;
    year?: string;
    program?: string;
    skills?: string[];
    resume?: string;
    clubs?: string[];
    projects?: string[];
    links?: {
      github?: string;
      linkedin?: string;
    };
  }
        const profileData: ProfileData = { name: formData.name };

        if (currentUser.type === 'faculty') {
          profileData.department = formData.department;
          profileData.researchAreas = formData.researchAreas.split(',').map(s => s.trim());
          profileData.supervisionAvailable = formData.supervisionAvailable === 'true';
        } else {
          profileData.year = formData.year;
          profileData.program = formData.program;
          profileData.skills = formData.skills.split(',').map(s => s.trim());
          profileData.resume = formData.resume;
          profileData.clubs = formData.clubs.split(',').map(s => s.trim()).filter(Boolean);
          profileData.projects = formData.projects.split(',').map(s => s.trim()).filter(Boolean);
          profileData.links = { github: formData.github, linkedin: formData.linkedin };
        }

      onCreateProfile(profileData);
    };

    return (
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 text-slate-200">
        <FloatingOrbs />
        <nav className="bg-transparent pt-8 mb-8">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <button
              onClick={onBack}
              className="flex items-center text-slate-300 hover:text-white transition-colors"
            >
              ← Back to Dashboard
            </button>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto px-4 pb-12">
          {userProfile ? (
            <>
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 backdrop-blur-lg border border-purple-400/30 rounded-xl p-8 mb-6">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-purple-500/30">
                    {userProfile.name?.charAt(0) || 'U'}
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h1 className="text-3xl font-bold text-white mb-1">{userProfile.name}</h1>
                    <p className="text-cyan-400 mb-2">{userProfile.email}</p>
                    {userProfile.type === 'student' && (
                      <p className="text-slate-400">{userProfile.year} • {userProfile.program}</p>
                    )}
                    {userProfile.type === 'faculty' && (
                      <p className="text-slate-400">{userProfile.department}</p>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <button className="p-3 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-all">
                      <Github className="h-5 w-5" />
                    </button>
                    <button className="p-3 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-all">
                      <Linkedin className="h-5 w-5" />
                    </button>
                    <button className="p-3 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-all">
                      <Mail className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Stats Bar */}
                <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-200/10">
                  {stats.map((stat, idx) => (
                    <div key={idx} className="text-center">
                      <stat.icon className="h-5 w-5 mx-auto mb-2 text-slate-400" />
                      <p className="text-xl font-bold text-white">{stat.value}</p>
                      <p className="text-xs text-slate-400">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Skills */}
                  {userProfile.type === 'student' && userProfile.skills && (
                    <GlassCard>
                      <h2 className="text-lg font-semibold text-white mb-4">Skills</h2>
                      <div className="flex flex-wrap gap-2">
                        {userProfile.skills.map((skill, idx) => (
                          <span key={idx} className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-400/30 text-pink-200 px-4 py-2 rounded-lg text-sm font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </GlassCard>
                  )}

                  {/* Research Areas for Faculty */}
                  {userProfile.type === 'faculty' && userProfile.researchAreas && (
                    <GlassCard>
                      <h2 className="text-lg font-semibold text-white mb-4">Research Areas</h2>
                      <div className="flex flex-wrap gap-2">
                        {userProfile.researchAreas.map((area, idx) => (
                          <span key={idx} className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 text-cyan-200 px-4 py-2 rounded-lg text-sm font-medium">
                            {area}
                          </span>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t border-slate-200/10">
                        <p className="text-sm text-slate-400">
                          <span className={userProfile.supervisionAvailable ? 'text-green-400' : 'text-red-400'}>
                            {userProfile.supervisionAvailable ? '✓ Available' : '✗ Not available'}
                          </span>
                          {' '}for supervision
                        </p>
                      </div>
                    </GlassCard>
                  )}

                  {/* Portfolio */}
                  <GlassCard>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-lg font-semibold text-white">Portfolio</h2>
                      <button className="text-sm text-cyan-400 hover:text-cyan-300">+ Add Project</button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {portfolioProjects.map(project => (
                        <div key={project.id} className="group relative bg-slate-700/30 rounded-lg overflow-hidden hover:bg-slate-700/50 transition-all">
                          <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />
                          <div className="p-4">
                            <h3 className="font-semibold text-white mb-1">{project.name}</h3>
                            <p className="text-sm text-slate-400 mb-3">{project.description}</p>
                            <div className="flex flex-wrap gap-1">
                              {project.tech.map((t, idx) => (
                                <span key={idx} className="px-2 py-0.5 bg-slate-600/50 text-slate-300 text-xs rounded">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Achievements */}
                  <GlassCard className="p-5">
                    <h2 className="text-lg font-semibold text-white mb-4">Achievements</h2>
                    <div className="space-y-3">
                      {achievements.map(achievement => (
                        <div key={achievement.id} className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${achievement.color} flex items-center justify-center text-lg`}>
                            {achievement.icon}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">{achievement.title}</p>
                            <p className="text-xs text-slate-400">{achievement.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </GlassCard>

                  {/* Activity */}
                  <GlassCard className="p-5">
                    <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 mt-2 rounded-full bg-green-500" />
                        <div>
                          <p className="text-sm text-slate-300">Joined CampusConnect project</p>
                          <p className="text-xs text-slate-500">2 days ago</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 mt-2 rounded-full bg-cyan-500" />
                        <div>
                          <p className="text-sm text-slate-300">Booked session with Dr. Chen</p>
                          <p className="text-xs text-slate-500">5 days ago</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 mt-2 rounded-full bg-purple-500" />
                        <div>
                          <p className="text-sm text-slate-300">Applied to CV Research</p>
                          <p className="text-xs text-slate-500">1 week ago</p>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent">
                Create Your Profile
              </h2>
              <GlassCard>
                <div className="space-y-4">
                  <FormInput
                    label="Full Name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />

                  {currentUser.type === 'faculty' ? (
                    <>
                      <FormInput
                        label="Department"
                        type="text"
                        value={formData.department}
                        onChange={(e) => setFormData({...formData, department: e.target.value})}
                      />
                      <FormInput
                        label="Research Areas (comma-separated)"
                        type="text"
                        value={formData.researchAreas}
                        onChange={(e) => setFormData({...formData, researchAreas: e.target.value})}
                        placeholder="Machine Learning, Computer Vision, AI Ethics"
                      />
                      <FormSelect
                        label="Available for Supervision?"
                        value={formData.supervisionAvailable}
                        onChange={(e) => setFormData({...formData, supervisionAvailable: e.target.value})}
                      >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </FormSelect>
                    </>
                  ) : (
                    <>
                      <FormInput
                        label="Year"
                        type="text"
                        value={formData.year}
                        onChange={(e) => setFormData({...formData, year: e.target.value})}
                        placeholder="3rd Year"
                      />
                      <FormInput
                        label="Program"
                        type="text"
                        value={formData.program}
                        onChange={(e) => setFormData({...formData, program: e.target.value})}
                        placeholder="Computer Science"
                      />
                       <FormInput
                        label="Skills (comma-separated)"
                        type="text"
                        value={formData.skills}
                        onChange={(e) => setFormData({...formData, skills: e.target.value})}
                        placeholder="React, Python, Data Analysis"
                      />
                    </>
                  )}

                  <GradientButton onClick={handleSubmit} className="w-full py-3 mt-4">
                    Create Profile
                  </GradientButton>
                </div>
              </GlassCard>
            </>
          )}
        </div>
      </div>
    );
  };
 
// Generic Modal
const Modal = ({ children, onBackdropClick }) => (
    <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onBackdropClick}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()} // Prevent click from bubbling to backdrop
      >
        <GlassCard>
            {children}
        </GlassCard>
      </div>
    </div>
);




// Research Component
const ResearchView = ({ currentUser, researchPosts, showForm, onToggleForm, onPostResearch, showApplicationForm, onToggleApplicationForm, onApplyResearch, onBack }) => {
    const [formData, setFormData] = useState({
      title: '', description: '', type: 'USRA', duration: '', skills: '',
      requirements: '', compensation: '', deadline: ''
    });
    const [applicationData, setApplicationData] = useState({
      coverLetter: '', availability: '', relevantExperience: '', whyInterested: ''
    });
 
    const handleSubmit = () => {
      onPostResearch({ ...formData, skills: formData.skills.split(',').map(s => s.trim()) });
      setFormData({ title: '', description: '', type: 'USRA', duration: '', skills: '',
      requirements: '', compensation: '', deadline: '' });
    };
 
    const handleApply = (postId) => {
      onApplyResearch(postId, applicationData);
      setApplicationData({ coverLetter: '', availability: '', relevantExperience: '', whyInterested: '' });
    };
 
    return (
      <MainContainer>
        <nav className="bg-transparent pt-8 mb-8">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <button onClick={onBack} className="flex items-center text-slate-300 hover:text-white transition-colors">
                ← Back to Dashboard
              </button>
              {currentUser?.type === 'faculty' && (
                <GradientButton onClick={() => onToggleForm(true)}>
                  <Plus className="h-4 w-4 mr-2" /> Post Opportunity
                </GradientButton>
              )}
            </div>
          </div>
        </nav>
 
        <div className="max-w-5xl mx-auto px-4 pb-12">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Research Opportunities</h2>
 
          {showForm && currentUser?.type === 'faculty' && (
            <Modal onBackdropClick={() => onToggleForm(false)}>
                <h3 className="text-2xl font-bold mb-4 text-white">Post New Research Opportunity</h3>
                <div className="space-y-4">
                  <FormInput label="Title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                  <FormTextArea label="Description" rows={3} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormSelect label="Type" value={formData.type} onChange={(e) => setFormData({...formData, type: e.target.value})}>
                      <option>USRA</option><option>AROO</option><option>CIS*4900 Project</option><option>Research Assistant</option><option>Volunteer</option>
                    </FormSelect>
                    <FormInput label="Duration" placeholder="Fall 2025" value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} />
                  </div>
                  <FormInput label="Required Skills (comma-separated)" placeholder="Python, ML" value={formData.skills} onChange={(e) => setFormData({...formData, skills: e.target.value})} />
                  <FormTextArea label="Requirements" placeholder="GPA requirements, etc." rows={2} value={formData.requirements} onChange={(e) => setFormData({...formData, requirements: e.target.value})} />
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormInput label="Compensation" placeholder="$6000 stipend" value={formData.compensation} onChange={(e) => setFormData({...formData, compensation: e.target.value})} />
                    <FormInput label="Application Deadline" type="date" value={formData.deadline} onChange={(e) => setFormData({...formData, deadline: e.target.value})} />
                  </div>
                  <div className="flex space-x-4 pt-4">
                    <GradientButton onClick={handleSubmit}>Post Opportunity</GradientButton>
                    <button onClick={() => onToggleForm(false)} className="text-slate-400 hover:text-white transition-colors">Cancel</button>
                  </div>
                </div>
            </Modal>
          )}


          {showApplicationForm && (
            <Modal onBackdropClick={() => onToggleApplicationForm(null)}>
                <h3 className="text-2xl font-bold mb-4 text-white">Apply to Research Position</h3>
                <div className="space-y-4">
                    <FormTextArea label="Cover Letter" rows={4} placeholder="Introduce yourself..." value={applicationData.coverLetter} onChange={(e) => setApplicationData({...applicationData, coverLetter: e.target.value})} />
                    <FormInput label="Availability" placeholder="e.g., May-August, 40 hours/week" value={applicationData.availability} onChange={(e) => setApplicationData({...applicationData, availability: e.target.value})} />
                    <FormTextArea label="Relevant Experience" rows={3} placeholder="Coursework, projects, skills..." value={applicationData.relevantExperience} onChange={(e) => setApplicationData({...applicationData, relevantExperience: e.target.value})} />
                    <FormTextArea label="Why are you interested?" rows={3} placeholder="What excites you?" value={applicationData.whyInterested} onChange={(e) => setApplicationData({...applicationData, whyInterested: e.target.value})} />
                    <div className="flex space-x-4 pt-4">
                        <GradientButton onClick={() => handleApply(showApplicationForm)}>
                            <Send className="h-4 w-4 mr-2" /> Submit Application
                        </GradientButton>
                        <button onClick={() => onToggleApplicationForm(null)} className="text-slate-400 hover:text-white transition-colors">Cancel</button>
                    </div>
                </div>
            </Modal>
          )}
 
          <div className="space-y-6">
            {researchPosts.map(post => (
              <GlassCard key={post.id}>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-white">{post.title}</h3>
                  <span className="bg-cyan-400/20 text-cyan-300 px-3 py-1 rounded-full text-sm font-semibold">{post.type}</span>
                </div>
                <p className="text-slate-300 mb-4">{post.description}</p>
                <div className="flex flex-wrap items-center text-sm text-slate-400 mb-4 gap-x-4 gap-y-2">
                  <span className="flex items-center"><Calendar className="h-4 w-4 mr-1.5" />{post.duration}</span>
                  <span className="flex items-center"><Users className="h-4 w-4 mr-1.5" />{post.facultyName}</span>
                  <span className="flex items-center"><FileText className="h-4 w-4 mr-1.5" />{post.applications} applications</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.skills.map((skill, idx) => (
                    <span key={idx} className="bg-slate-700/80 text-slate-300 px-3 py-1 rounded-full text-xs">{skill}</span>
                  ))}
                </div>
                {currentUser?.type === 'student' && (
                  <GradientButton onClick={() => onToggleApplicationForm(post.id)}>Apply Now</GradientButton>
                )}
              </GlassCard>
            ))}
          </div>
        </div>
      </MainContainer>
    );
  };
 
  // Startups Component
  const StartupsView = ({ currentUser, startupPosts, showForm, onToggleForm, onPostStartup, showIncubatorForm, onToggleIncubatorForm, onApplyIncubator, onInterest, onBack }) => {
    const [formData, setFormData] = useState({ title: '', pitch: '', skillsNeeded: '', contact: '', stage: 'idea', commitment: '', lookingFor: '' });
    const [incubatorData, setIncubatorData] = useState({ teamMembers: '', progress: '', milestones: '', pitchDeck: '', commitment: '' });
    const [interestMessage, setInterestMessage] = useState('');
    const [showInterestForm, setShowInterestForm] = useState(null);
 
    const handleSubmit = () => {
      onPostStartup({ ...formData, skillsNeeded: formData.skillsNeeded.split(',').map(s => s.trim()) });
      setFormData({ title: '', pitch: '', skillsNeeded: '', contact: '', stage: 'idea', commitment: '', lookingFor: '' });
    };
 
    const handleIncubatorSubmit = (startupId) => {
      onApplyIncubator(startupId, incubatorData);
      setIncubatorData({ teamMembers: '', progress: '', milestones: '', pitchDeck: '', commitment: '' });
    };
 
    const handleInterestSubmit = (postId) => {
      onInterest(postId, interestMessage);
      setInterestMessage('');
      setShowInterestForm(null);
      alert('Interest registered! The founder will see your contact info.');
    };
 
    return (
        <MainContainer>
            <nav className="bg-transparent pt-8 mb-8">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                <button onClick={onBack} className="flex items-center text-slate-300 hover:text-white transition-colors">
                    ← Back to Dashboard
                </button>
                {currentUser?.type === 'student' && (
                    <GradientButton onClick={() => onToggleForm(true)} className="from-pink-500 to-purple-600 hover:shadow-pink-500/50">
                        <Plus className="h-4 w-4 mr-2" /> Post Idea
                    </GradientButton>
                )}
                </div>
            </div>
            </nav>
    
            <div className="max-w-5xl mx-auto px-4 pb-12">
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">Startup Ideas</h2>
    
            {showForm && currentUser?.type === 'student' && (
                <Modal onBackdropClick={() => onToggleForm(false)}>
                    <h3 className="text-2xl font-bold mb-4 text-white">Post Your Startup Idea</h3>
                    <div className="space-y-4">
                        <FormInput label="Startup Name" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                        <FormTextArea label="Elevator Pitch" rows={3} placeholder="What problem are you solving?" value={formData.pitch} onChange={(e) => setFormData({...formData, pitch: e.target.value})} />
                        <div className="grid md:grid-cols-2 gap-4">
                            <FormSelect label="Stage" value={formData.stage} onChange={(e) => setFormData({...formData, stage: e.target.value})}>
                                <option value="idea">Just an idea</option><option value="prototype">Building prototype</option><option value="mvp">Have MVP</option><option value="launched">Launched</option>
                            </FormSelect>
                            <FormInput label="Time Commitment Expected" placeholder="e.g., 10-15 hours/week" value={formData.commitment} onChange={(e) => setFormData({...formData, commitment: e.target.value})} />
                        </div>
                        <FormInput label="Skills Needed (comma-separated)" placeholder="Mobile Dev, UI/UX" value={formData.skillsNeeded} onChange={(e) => setFormData({...formData, skillsNeeded: e.target.value})} />
                        <FormTextArea label="What are you looking for?" rows={2} placeholder="Co-founders, advisors..." value={formData.lookingFor} onChange={(e) => setFormData({...formData, lookingFor: e.target.value})} />
                        <FormInput label="Contact (Discord/IG/etc)" placeholder="@yourusername" value={formData.contact} onChange={(e) => setFormData({...formData, contact: e.target.value})} />
                        <div className="flex space-x-4 pt-4">
                            <GradientButton onClick={handleSubmit} className="from-pink-500 to-purple-600 hover:shadow-pink-500/50">Post Idea</GradientButton>
                            <button onClick={() => onToggleForm(false)} className="text-slate-400 hover:text-white transition-colors">Cancel</button>
                        </div>
                    </div>
                </Modal>
            )}


            {showIncubatorForm && (
                 <Modal onBackdropClick={() => onToggleIncubatorForm(null)}>
                    <h3 className="text-2xl font-bold mb-4 text-white">Apply to Incubator Cohort</h3>
                    <div className="space-y-4">
                        <FormTextArea label="Team Members (include roles)" rows={3} placeholder="John Doe - CEO..." value={incubatorData.teamMembers} onChange={(e) => setIncubatorData({...incubatorData, teamMembers: e.target.value})} />
                        <FormTextArea label="Current Progress" rows={3} placeholder="What have you built so far?" value={incubatorData.progress} onChange={(e) => setIncubatorData({...incubatorData, progress: e.target.value})} />
                        <FormTextArea label="Milestones for This Semester" rows={3} placeholder="1. Complete MVP by Oct...\n2. Onboard 50 users by Nov..." value={incubatorData.milestones} onChange={(e) => setIncubatorData({...incubatorData, milestones: e.target.value})} />
                        <FormInput label="Pitch Deck Link (optional)" placeholder="drive.google.com/..." value={incubatorData.pitchDeck} onChange={(e) => setIncubatorData({...incubatorData, pitchDeck: e.target.value})} />
                        <FormInput label="Weekly Time Commitment" placeholder="e.g., 20 hours/week" value={incubatorData.commitment} onChange={(e) => setIncubatorData({...incubatorData, commitment: e.target.value})} />
                        <div className="bg-purple-500/20 rounded-lg p-4 my-4">
                            <p className="text-sm text-purple-300"><strong>Commitment:</strong> Teams must attend weekly check-ins and present at the final showcase. Reaching pre-determined milestones makes you eligible for microgrants and the final prize pool.</p>
                        </div>
                        <div className="flex space-x-4 pt-4">
                            <GradientButton onClick={() => handleIncubatorSubmit(showIncubatorForm)} className="from-pink-500 to-purple-600 hover:shadow-pink-500/50"><Target className="h-4 w-4 mr-2"/>Submit Application</GradientButton>
                            <button onClick={() => onToggleIncubatorForm(null)} className="text-slate-400 hover:text-white transition-colors">Cancel</button>
                        </div>
                    </div>
                </Modal>
            )}


            {showInterestForm && (
                <Modal onBackdropClick={() => {setShowInterestForm(null); setInterestMessage('');}}>
                    <h3 className="text-lg font-semibold mb-4 text-white">Express Interest</h3>
                    <FormTextArea label="Message (optional)" rows={3} placeholder="Tell them why you're interested..." value={interestMessage} onChange={(e) => setInterestMessage(e.target.value)} />
                    <div className="flex space-x-4 pt-4">
                        <GradientButton onClick={() => handleInterestSubmit(showInterestForm)} className="from-pink-500 to-purple-600 hover:shadow-pink-500/50">Send Interest</GradientButton>
                        <button onClick={() => {setShowInterestForm(null); setInterestMessage('');}} className="text-slate-400 hover:text-white transition-colors">Cancel</button>
                    </div>
                </Modal>
            )}
    
            <div className="space-y-6">
                {startupPosts.map(post => (
                <GlassCard key={post.id}>
                    <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-white">{post.title}</h3>
                    <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            post.stage === 'idea' ? 'bg-yellow-400/20 text-yellow-300' :
                            post.stage === 'prototype' ? 'bg-blue-400/20 text-blue-300' :
                            post.stage === 'mvp' ? 'bg-green-400/20 text-green-300' :
                            'bg-purple-400/20 text-purple-300'
                        }`}>{post.stage}</span>
                        <div className="flex items-center text-sm text-yellow-400"><Star className="h-4 w-4 mr-1" /><span>{post.interested} interested</span></div>
                    </div>
                    </div>
                    <p className="text-slate-300 mb-4">{post.pitch}</p>
                    <div className="flex flex-wrap items-center text-sm text-slate-400 mb-4 gap-x-4 gap-y-2">
                        <span className="flex items-center"><Users className="h-4 w-4 mr-1.5" />{post.studentName}</span>
                        <span className="flex items-center"><Mail className="h-4 w-4 mr-1.5" />{post.contact}</span>
                        {post.commitment && <span className="flex items-center"><Clock className="h-4 w-4 mr-1.5" />{post.commitment}</span>}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-6">
                    <span className="text-sm text-slate-200 font-medium self-center">Looking for:</span>
                    {post.skillsNeeded.map((skill, idx) => (
                        <span key={idx} className="bg-pink-500/20 text-pink-300 px-3 py-1 rounded-full text-xs">{skill}</span>
                    ))}
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <GradientButton onClick={() => setShowInterestForm(post.id)} className="from-pink-500 to-orange-500 hover:shadow-pink-500/50">I'm Interested</GradientButton>
                        <GradientButton onClick={() => onToggleIncubatorForm(post.id)} className="from-purple-500 to-indigo-600 hover:shadow-purple-500/50">Apply to Incubator</GradientButton>
                    </div>
                </GlassCard>
                ))}
            </div>
            </div>
        </MainContainer>
    );
  };
 


export default GuelphIncubator;