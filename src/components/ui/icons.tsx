import {
    AlertTriangle,
    ArrowRight,
    Check,
    ChevronLeft,
    ChevronRight,
    Command,
    CreditCard,
    File,
    FileText,
    HelpCircle,
    Image,
    Laptop,
    Moon,
    MoreVertical,
    Pizza,
    Plus,
    Settings,
    SunMedium,
    Trash,
    User,
    X,
    type Icon as LucideIcon,
  } from "lucide-react"
  
  export type Icon = LucideIcon
  
  export const Icons = {
    sun: SunMedium,
    moon: Moon,
    laptop: Laptop,
    logo: Command,
    close: X,
    spinner: (props: React.ComponentProps<"svg">) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
    ),
    user: User,
    arrowRight: ArrowRight,
    help: HelpCircle,
    pizza: Pizza,
    plus: Plus,
    creditCard: CreditCard,
    settings: Settings,
    trash: Trash,
    page: File,
    media: Image,
    billing: CreditCard,
    ellipsis: MoreVertical,
    add: Plus,
    warning: AlertTriangle,
    file: FileText,
    check: Check,
    chevronLeft: ChevronLeft,
    chevronRight: ChevronRight,
  }
  
  
  
  
  
  
    