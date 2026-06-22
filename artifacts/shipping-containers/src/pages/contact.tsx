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
  const [interest, setInterest] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          subject: `Built Box Containers — Contact Form: ${interest || "General Inquiry"}`,
          from_name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          phone: data.phone || "Not provided",
          interest: interest || "Not specified",
          message: data.message || "No details provided",
        }),
      });
      const result = await res.json();
      if (result.success) {
        toast({
          title: "Message Sent",
          description: "A Built Box Containers representative will contact you shortly.",
        });
        form.reset();
        setInterest("");
      } else {
        toast({ title: "Send failed", description: "Please try again or email us directly.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Network error", description: "Please email us at sales@builtboxcontainers.com", variant: "destructive" });
    } finally {
      setLoading(false);
    }
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
                <p className="text-muted-foreground">1-800-BUILT-BOX<br />sales@builtboxcontainers.com</p>
              </div>
            </div>
          </div>

          <div className="bg-card p-8 border border-border shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" name="firstName" required className="bg-background" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" name="lastName" required className="bg-background" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required className="bg-background" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" type="tel" className="bg-background" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interest">Interest</Label>
                <Select value={interest} onValueChange={setInterest}>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="Select container type..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="20ft Standard Storage">20' Standard Storage</SelectItem>
                    <SelectItem value="40ft Standard Storage">40' Standard Storage</SelectItem>
                    <SelectItem value="Reefer Container">Reefer Container</SelectItem>
                    <SelectItem value="Underslung Genset">Underslung Genset</SelectItem>
                    <SelectItem value="Pop-up Retail">Pop-up Retail</SelectItem>
                    <SelectItem value="Jobsite Office">Jobsite Office</SelectItem>
                    <SelectItem value="Custom Modification">Custom Modification</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Project Details</Label>
                <Textarea id="message" name="message" rows={4} className="bg-background" placeholder="Tell us about your project timeline and location..." />
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
