import * as React from "react";
import { ChevronDown } from "lucide-react";

const AccordionContext = React.createContext();

const Accordion = React.forwardRef(({ type = "single", collapsible = false, children, ...props }, ref) => {
  const [openItems, setOpenItems] = React.useState(new Set());

  const toggleItem = (value) => {
    const newOpenItems = new Set(openItems);
    if (type === "single") {
      if (newOpenItems.has(value)) {
        newOpenItems.delete(value);
      } else {
        newOpenItems.clear();
        newOpenItems.add(value);
      }
    } else {
      if (newOpenItems.has(value)) {
        newOpenItems.delete(value);
      } else {
        newOpenItems.add(value);
      }
    }
    setOpenItems(newOpenItems);
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, type }}>
      <div ref={ref} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
});

Accordion.displayName = "Accordion";

const AccordionItem = React.forwardRef(({ value, children, ...props }, ref) => (
  <div ref={ref} {...props}>
    {children}
  </div>
));

AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef(({ children, ...props }, ref) => {
  const context = React.useContext(AccordionContext);
  const value = React.useContext(AccordionItemContext);

  return (
    <button
      ref={ref}
      onClick={() => context.toggleItem(value)}
      {...props}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        background: "none",
        border: "none",
        cursor: "pointer",
        ...props.style
      }}
    >
      {children}
      <ChevronDown
        size={16}
        style={{
          transform: context.openItems.has(value) ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.2s ease",
          flexShrink: 0
        }}
      />
    </button>
  );
});

AccordionTrigger.displayName = "AccordionTrigger";

const AccordionItemContext = React.createContext();

// Wrapper component to provide value context
const AccordionItemWrapper = ({ value, children }) => (
  <AccordionItemContext.Provider value={value}>
    {children}
  </AccordionItemContext.Provider>
);

const AccordionContent = React.forwardRef(({ children, ...props }, ref) => {
  const context = React.useContext(AccordionContext);
  const value = React.useContext(AccordionItemContext);
  const isOpen = context.openItems.has(value);

  return (
    <div
      ref={ref}
      style={{
        display: isOpen ? "block" : "none",
        ...props.style
      }}
      {...props}
    >
      {children}
    </div>
  );
});

AccordionContent.displayName = "AccordionContent";

// Enhanced Accordion Item that wraps value context
const AccordionItemEnhanced = React.forwardRef(({ value, children, className }, ref) => (
  <AccordionItemWrapper value={value}>
    <AccordionItem ref={ref} className={className}>
      {children}
    </AccordionItem>
  </AccordionItemWrapper>
));

AccordionItemEnhanced.displayName = "AccordionItem";

export { Accordion, AccordionItemEnhanced as AccordionItem, AccordionTrigger, AccordionContent };
