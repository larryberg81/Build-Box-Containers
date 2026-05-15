import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate submission
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Quote Request Sent",
        description: "An IronBox representative will contact you shortly.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <div className="py-12 md:py-24 bg-background min-h-[80vh]">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight mb-6">Get a Quote</h1>
            <p className="text-lg text-muted-foreground mb-10">
              Need a standard container or a custom modification? Tell us what you're building, and we'll get back to you with pricing and availability.
            </p>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-display font-bold uppercase tracking-widest text-sm mb-2 text-primary">Headquarters</h3>
                <p className="text-muted-foreground">100 Industrial Parkway<br />Detroit, MI 48209</p>
              </div>
              <div>
                <h3 className="font-display font-bold uppercase tracking-widest text-sm mb-2 text-primary">Contact</h3>
                <p className="text-muted-foreground">1-800-IRONBOX<br />sales@ironbox.com</p>
              </div>
            </div>
          </div>

          <div className="bg-card p-8 border border-border shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" required className="bg-background" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" required className="bg-background" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required className="bg-background" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" className="bg-background" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interest">Interest</Label>
                <Select required>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select container type..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="20ft">20' Standard Storage</SelectItem>
                    <SelectItem value="40ft">40' Standard Storage</SelectItem>
                    <SelectItem value="retail">Pop-up Retail</SelectItem>
                    <SelectItem value="office">Jobsite Office</SelectItem>
                    <SelectItem value="custom">Custom Modification</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Project Details</Label>
                <Textarea id="message" rows={4} className="bg-background" placeholder="Tell us about your project timeline and location..." />
              </div>

              <Button type="submit" disabled={loading} className="w-full h-12 text-base font-bold uppercase tracking-wider">
                {loading ? "Sending..." : "Submit Request"}
              </Button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
