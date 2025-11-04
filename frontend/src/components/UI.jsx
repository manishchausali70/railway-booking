import React from 'react';
import { motion } from 'framer-motion';
import cx from 'classnames';

export function Container({ children, className }) {
  return <div className={cx('max-w-6xl mx-auto px-4 sm:px-6 lg:px-8', className)}>{children}</div>;
}

export function Card({ children, className }) {
  return (
    <div className={cx('bg-white rounded-xl shadow-sm border border-gray-200', className)}>
      {children}
    </div>
  );
}

export function Page({ children, className }) {
  return (
    <div className={cx('min-h-[calc(100vh-64px)] py-6 md:py-10 bg-light', className)}>
      {children}
    </div>
  );
}

export function PageHeader({ title, subtitle, icon: Icon }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        {Icon ? <Icon className="text-primary" size={28} /> : null}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h1>
      </div>
      {subtitle ? <p className="text-gray-500 mt-1">{subtitle}</p> : null}
    </div>
  );
}

export function Button({ children, className, variant = 'primary', ...rest }) {
  const base = 'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50';
  const styles = {
    primary: 'bg-primary text-white hover:bg-blue-700 focus:ring-blue-500',
    outline: 'bg-white text-primary border border-primary hover:bg-blue-50 focus:ring-blue-500',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-400'
  };
  return (
    <button className={cx(base, styles[variant], className)} {...rest}>
      {children}
    </button>
  );
}

export function Input({ label, id, type = 'text', className, ...rest }) {
  return (
    <label className="block">
      {label && <span className="block text-sm font-medium text-gray-700 mb-1">{label}</span>}
      <input id={id} type={type} className={cx('w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary', className)} {...rest} />
    </label>
  );
}

export function Select({ label, id, className, children, ...rest }) {
  return (
    <label className="block">
      {label && <span className="block text-sm font-medium text-gray-700 mb-1">{label}</span>}
      <select id={id} className={cx('w-full rounded-lg border-gray-300 focus:border-primary focus:ring-primary', className)} {...rest}>
        {children}
      </select>
    </label>
  );
}

export const FadeIn = ({ children, className, delay = 0 }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay }}>
    {children}
  </motion.div>
);
