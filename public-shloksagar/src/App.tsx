import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { useAnalytics } from "./hooks/useAnalytics";
import Index from "./pages/Index";
import Categories from "./pages/Categories";
import CategoryDetail from "./pages/CategoryDetail";
import ContentDetail from "./pages/ContentDetail";
import GitaShlok from "./pages/GitaShlok";
import Quotes from "./pages/Quotes";
import GitaSandesh from "./pages/GitaSandesh";
import Wallpapers from "./pages/Wallpapers";
import Festivals from "./pages/Festivals";
import About from "./pages/About";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AnalyticsWrapper({ children }: { children: React.ReactNode }) {
  useAnalytics();
  return <>{children}</>;
}

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <LanguageProvider>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <AnalyticsWrapper>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/categories/:slug" element={<CategoryDetail />} />

                    {/* Content pages */}
                    <Route path="/bhajan" element={<ContentDetail />} />
                    <Route path="/bhajan/:slug" element={<ContentDetail />} />
                    <Route path="/aarti" element={<ContentDetail />} />
                    <Route path="/aarti/:slug" element={<ContentDetail />} />
                    <Route path="/chalisa" element={<ContentDetail />} />
                    <Route path="/chalisa/:slug" element={<ContentDetail />} />
                    <Route path="/stotra" element={<ContentDetail />} />
                    <Route path="/stotra/:slug" element={<ContentDetail />} />

                    {/* Gita Shlok */}
                    <Route path="/gita-shlok" element={<GitaShlok />} />
                    <Route path="/gita-shlok/:slug" element={<GitaShlok />} />

                    {/* Daily Content */}
                    <Route path="/quotes" element={<Quotes />} />
                    <Route path="/gita-sandesh" element={<GitaSandesh />} />

                    {/* Media */}
                    <Route path="/wallpapers" element={<Wallpapers />} />
                    <Route path="/videos" element={<Festivals />} />

                    {/* Other */}
                    <Route path="/festivals" element={<Festivals />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/search" element={<Search />} />

                    {/* Catch all */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </AnalyticsWrapper>
              </BrowserRouter>
            </TooltipProvider>
          </AuthProvider>
        </LanguageProvider>
      </HelmetProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
