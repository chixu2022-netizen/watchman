import React from 'react';
import { Link } from 'react-router-dom'
import './Logo.css';

const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <Link to="/" aria-label="Home" className="logo-link">
    <svg className={className || 'nm-logo'} version="1.0" xmlns="http://www.w3.org/2000/svg" width="300.000000pt" height="200.000000pt" viewBox="0 0 300.000000 200.000000" preserveAspectRatio="xMidYMid meet">
      <g transform="translate(0.000000,200.000000) scale(0.050000,-0.050000)" fill="#000000" stroke="none">
        <path d="M2263 2485 c-23 -19 -106 -161 -185 -315 -78 -154 -145 -282 -147 -285 -2 -3 -38 134 -79 305 l-75 310 -158 0 -158 0 19 -50 c10 -27 74 -237 140 -465 131 -449 152 -485 274 -485 122 0 191 92 437 580 53 107 55 109 76 60 41 -98 299 -551 339 -595 30 -32 63 -45 121 -45 127 0 159 45 236 341 37 143 71 259 77 259 5 0 68 -114 138 -252 172 -337 182 -348 300 -348 124 0 143 22 314 359 128 251 138 265 152 210 8 -33 45 -171 81 -309 l65 -250 158 -6 c144 -5 156 -3 143 30 -15 38 -183 593 -239 790 -52 183 -188 251 -300 151 -53 -46 -352 -566 -352 -610 0 -62 -40 -5 -180 258 -179 336 -229 397 -325 397 -116 0 -157 -59 -231 -330 -37 -132 -70 -252 -75 -267 -5 -14 -72 98 -150 250 -157 309 -190 347 -299 347 -43 0 -94 -15 -117 -35z"/>
      </g>
    </svg>
  </Link>
);

export default Logo;
