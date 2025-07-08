import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Events from "./pages/Events";
import Admin from "./pages/Admin";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";
import Game from "./pages/admin/Game";
import Stat from "./pages/admin/Stat";
import Draw from "./pages/admin/Draw";
import System from "./pages/admin/System";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/events" element={<Events />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/game" element={<Game />} />
          <Route path="/admin/stat" element={<Stat />} />
          <Route path="/admin/draw" element={<Draw />} />
          <Route path="/admin/system" element={<System />} />
          <Route path="/results" element={<Results />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
