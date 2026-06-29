import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import ExperiencePage from "@/pages/ExperiencePage";
import ProjectsPage from "@/pages/ProjectsPage";
import ProjectCaseStudyPage from "@/pages/ProjectCaseStudyPage";
import SkillsPage from "@/pages/SkillsPage";
import OdooPage from "@/pages/OdooPage";
import EducationPage from "@/pages/EducationPage";
import ContactPage from "@/pages/ContactPage";
import NotFound from "@/pages/not-found";
import { useAnimateOnScroll } from "@/hooks/useAnimateOnScroll";

const queryClient = new QueryClient();

function Router() {
  useAnimateOnScroll();
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/experience" component={ExperiencePage} />
      <Route path="/projects" component={ProjectsPage} />
      <Route path="/projects/:slug" component={ProjectCaseStudyPage} />
      <Route path="/skills" component={SkillsPage} />
      <Route path="/odoo" component={OdooPage} />
      <Route path="/education" component={EducationPage} />
      <Route path="/contact" component={ContactPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Router />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
