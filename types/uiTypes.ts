import { ReactNode } from "react";


export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean; 
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isFullWidth?: boolean;
}


// types/input.ts

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string; // Message d'erreur si la validation échoue
  helperText?: string; // Texte d'aide sous l'input
  isFullWidth?: boolean;
}


// types/card.ts

export interface CardProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  className?: string; // Pour ajouter du style CSS personnalisé
  onClick?: () => void;
}


// types/badge.ts

export type BadgeStatus = 'success' | 'warning' | 'error' | 'info';

export interface BadgeProps {
  label: string;
  status?: BadgeStatus;
  isRounded?: boolean;
}


// Select / Dropdown
export interface SelectOption {
  label: string;
  value: string | number;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
}

// Checkbox & Radio
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
}

// Textarea
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  rows?: number;
}

// Navbar & Links
export interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  isActive?: boolean;
}

// Container (Mise en page)
export interface ContainerProps {
  children: React.ReactNode;
  size?: 'fluid' | 'sm' | 'md' | 'lg' | 'xl';
  as?: 'div' | 'section' | 'main' | 'article'; // Pour le SEO
  className?: string;
}

// Modal (Fenêtre surgissante)
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'full';
}


// Table (Tableau de données)
export interface Column<T> {
  header: string;
  key: keyof T;
  render?: (item: T) => React.ReactNode;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
}

// Alert / Toast
export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
  variant: AlertVariant;
  title?: string;
  message: string;
  onClose?: () => void;
}

// Avatar
export interface AvatarProps {
  src?: string;
  alt: string;
  fallback: string; // Initiales si l'image échoue
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;

}


// Spinner (Chargement)
export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

// Progress Bar
export interface ProgressProps {
  value: number; // de 0 à 100
  showValue?: boolean;
  color?: string;
  className?: string;
}


// Breadcrumbs (Fil d'Ariane)
export interface BreadcrumbItem {
  label: string;
  href?: string; // Si pas de href, c'est l'élément actuel (non cliquable)
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
}

// Pagination
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number; // Nombre de pages affichées autour de la page actuelle
}

// Tabs (Onglets)
export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  defaultTabId?: string;
  onChange?: (id: string) => void;
}


// Tooltip (Info-bulle)
export interface TooltipProps {
  children: React.ReactNode;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

// Accordion (FAQ, sections pliables)
export interface AccordionItem {
  id: string;
  title: ReactNode;   // On remplace 'string' par 'ReactNode'
  content: ReactNode; // On s'assure que le contenu aussi accepte du JSX
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string; // Ajout de className pour éviter d'autres erreurs TS
}

// Skeleton (Chargement progressif)
export interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animate?: 'pulse' | 'wave' | 'none';
}


// Grid System
export interface GridProps {
  children: React.ReactNode;
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  gap?: number | string;
  tabletCols?: number;
  mobileCols?: number;
  className?: string; // Pour ajouter du style CSS personnalisé

}

// List Item (Pour les listes de notifications ou d'utilisateurs)
export interface ListItemProps {
  leading?: React.ReactNode; // Icône ou Avatar à gauche
  title: string;
  subtitle?: string;
  trailing?: React.ReactNode; // Bouton d'action ou badge à droite
  onClick?: () => void;
  isActive?: boolean;
}

// Pour gérer les espacements de manière cohérente
export type Spacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// Pour gérer les couleurs de thèmes
export type ThemeColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'neutral';

// Pour typer les icônes (si tu utilises Lucide, FontAwesome, etc.)
export type IconProps = {
  color?: string;
  size?: number | string;
  className?: string;
};