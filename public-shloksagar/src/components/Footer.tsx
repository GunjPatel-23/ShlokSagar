import { Link } from 'react-router-dom';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t bg-muted/50 mt-auto">
            <div className="container py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                            श्लोकसागर
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            भक्ति साहित्य का डिजिटल संग्रह
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">भक्ति साहित्य</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/bhajans" className="text-muted-foreground hover:text-foreground">भजन</Link></li>
                            <li><Link to="/aarti" className="text-muted-foreground hover:text-foreground">आरती</Link></li>
                            <li><Link to="/chalisa" className="text-muted-foreground hover:text-foreground">चालीसा</Link></li>
                            <li><Link to="/stotra" className="text-muted-foreground hover:text-foreground">स्तोत्र</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">गीता ज्ञान</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/gita-shlok" className="text-muted-foreground hover:text-foreground">गीता श्लोक</Link></li>
                            <li><Link to="/gita-sandesh" className="text-muted-foreground hover:text-foreground">गीता संदेश</Link></li>
                            <li><Link to="/quotes" className="text-muted-foreground hover:text-foreground">प्रेरक विचार</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4">मीडिया</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/wallpapers" className="text-muted-foreground hover:text-foreground">वॉलपेपर</Link></li>
                            <li><Link to="/videos" className="text-muted-foreground hover:text-foreground">वीडियो</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
                    <p>&copy; {currentYear} श्लोकसागर. सर्वाधिकार सुरक्षित.</p>
                </div>
            </div>
        </footer>
    );
}
