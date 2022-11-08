/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    /*plugin(function({ addComponents }) {
      addComponents({
        ".rpgui-pixelated": {
          msInterpolationMode: "nearest-neighbor",
          imageRendering: [
            "-webkit-optimize-contrast",
            "-webkit-crisp-edges",
            "-moz-crisp-edges",
            "-o-crisp-edges",
            "pixelated"
          ]
        },
        ".rpgui-noselect": {
          WebkitTouchCallout: "none",
          WebkitUserSelect: "none",
          KhtmlUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
          userSelect: "none"
        },
        ".rpgui-center": { textAlign: "center", alignContent: "center" },
        ".rpgui-rotate-90": {
          WebkitTransform: "rotate(90deg)",
          MozTransform: "rotate(90deg)",
          OTransform: "rotate(90deg)",
          msTransform: "rotate(90deg)",
          transform: "rotate(90deg)",
          msTransformOrigin: "0% 50%",
          WebkitTransformOrigin: "0% 50%",
          transformOrigin: "0% 50%"
        },
        ".rpgui-button": {
          backgroundColor: "Transparent",
          backgroundRepeat: "no-repeat",
          border: "none",
          overflow: "hidden",
          outline: "none",
          background: 'url("img/button.png") no-repeat no-repeat',
          backgroundClip: "padding-box",
          backgroundOrigin: "padding-box",
          backgroundPosition: "center",
          backgroundSize: "100% 100%",
          fontSize: "1.0em",
          maxWidth: "100%",
          minWidth: "140px",
          height: "60px",
          display: "inline-block",
          paddingLeft: "35px",
          paddingRight: "35px"
        },
        ".rpgui-button.hover,\n.rpgui-button:hover": {
          backgroundImage: 'url("img/button-hover.png")'
        },
        ".rpgui-button.down,\n.rpgui-button:active": {
          backgroundImage: 'url("img/button-down.png")'
        },
        ".rpgui-button.golden p": { display: "inline-block" },
        ".rpgui-button.golden": {
          backgroundColor: "Transparent",
          backgroundRepeat: "no-repeat",
          border: "none",
          overflow: ["hidden", "visible"],
          outline: "none",
          background: 'url("img/button-golden.png") no-repeat no-repeat',
          backgroundClip: "padding-box",
          backgroundOrigin: "padding-box",
          backgroundPosition: "center",
          backgroundSize: "100% 80%",
          maxWidth: "100%",
          minWidth: "140px",
          height: "60px",
          display: "inline-block",
          paddingTop: "5px",
          paddingLeft: "35px",
          paddingRight: "35px"
        },
        ".rpgui-button.golden.hover,\n.rpgui-button.golden:hover": {
          backgroundImage: 'url("img/button-golden-hover.png")'
        },
        ".rpgui-button.golden.down,\n.rpgui-button.golden:active": {
          backgroundImage: 'url("img/button-golden-down.png")'
        },
        ".rpgui-button.golden:before": {
          whiteSpace: "nowrap",
          display: ["inline-block", "block"],
          content: '""',
          width: "34px",
          height: "110%",
          background:
            'transparent url("img/button-golden-left.png") no-repeat right center',
          backgroundSize: "100% 100%",
          margin: "0 0 0 0",
          left: "0px",
          cssFloat: "left",
          marginLeft: "-46px",
          marginTop: "-5%"
        },
        ".rpgui-button.golden:after": {
          whiteSpace: "nowrap",
          display: "block",
          content: '""',
          width: "34px",
          height: "110%",
          background:
            'transparent url("img/button-golden-right.png") no-repeat left center',
          backgroundSize: "100% 100%",
          margin: "0 0 0 0",
          right: "0px",
          cssFloat: "right",
          marginRight: "-46px",
          marginTop: "-5%"
        },
        ".rpgui-content input[type=checkbox].rpgui-checkbox": { display: "none" },
        ".rpgui-content input[type=checkbox].rpgui-checkbox + label": {
          background: 'url("img/checkbox-off.png") no-repeat',
          lineHeight: "24px",
          display: "inline-block",
          backgroundSize: "auto 100%",
          paddingLeft: "34px",
          height: "24px",
          marginTop: "10px",
          marginBottom: "10px"
        },
        ".rpgui-content input[type=checkbox].rpgui-checkbox:checked + label": {
          background: 'url("img/checkbox-on.png") no-repeat',
          lineHeight: "24px",
          display: "inline-block",
          backgroundSize: "auto 100%",
          paddingLeft: "34px",
          height: "24px"
        },
        ".rpgui-content input[type=checkbox].rpgui-checkbox.golden + label": {
          background: 'url("img/checkbox-golden-off.png") no-repeat',
          backgroundSize: "auto 100%"
        },
        ".rpgui-content input[type=checkbox].rpgui-checkbox.golden:checked + label": {
          background: 'url("img/checkbox-golden-on.png") no-repeat',
          backgroundSize: "auto 100%"
        },
        ".rpgui-content": {
          padding: "0 0 0 0",
          margin: "0 0 0 0",
          width: "100%",
          height: "100%",
          left: "0px",
          top: "0px",
          position: "fixed",
          overflow: "hidden",
          fontSize: "0.8em"
        },
        ".rpgui-content *": {
          outline: "none",
          userDrag: "none",
          WebkitUserDrag: "none",
          WebkitTouchCallout: "none",
          WebkitUserSelect: "none",
          KhtmlUserSelect: "none",
          MozUserSelect: "none",
          msUserSelect: "none",
          userSelect: "none",
          WebkitTapHighlightColor: "transparent",
          msInterpolationMode: "nearest-neighbor",
          imageRendering: [
            "-webkit-optimize-contrast",
            "-webkit-crisp-edges",
            "-moz-crisp-edges",
            "-o-crisp-edges",
            "pixelated"
          ],
          fontFamily: "'Press Start 2P', cursive"
        },
        ".rpgui-container": { position: "fixed", zIndex: 10, overflow: "show" },
        ".rpgui-container.framed": {
          borderStyle: "solid",
          borderImageSource: 'url("img/border-image.png")',
          borderImageRepeat: "repeat",
          borderImageSlice: "6 6 6 6",
          borderImageWidth: "18px",
          borderWidth: "15px",
          padding: "12px",
          boxSizing: "border-box",
          MozBoxSizing: "border-box",
          WebkitBoxSizing: "border-box",
          background: 'url("img/background-image.png") repeat repeat',
          backgroundClip: "padding-box",
          backgroundOrigin: "padding-box",
          backgroundPosition: "center"
        },
        ".rpgui-container.framed-golden": {
          borderStyle: "solid",
          borderImageSource: 'url("img/border-image-golden.png")',
          borderImageRepeat: "repeat",
          borderImageSlice: "4 4 4 4",
          borderImageWidth: "18px",
          borderWidth: "15px",
          padding: "12px",
          boxSizing: "border-box",
          MozBoxSizing: "border-box",
          WebkitBoxSizing: "border-box",
          background: 'url("img/background-image-golden.png") repeat repeat',
          backgroundClip: "padding-box",
          backgroundOrigin: "padding-box",
          backgroundPosition: "center"
        },
        ".rpgui-container.framed-golden-2": {
          borderStyle: "solid",
          borderImageSource: 'url("img/border-image-golden2.png")',
          borderImageRepeat: "repeat",
          borderImageSlice: "8 8 8 8",
          borderImageWidth: "18px",
          borderWidth: "15px",
          padding: "12px",
          boxSizing: "border-box",
          MozBoxSizing: "border-box",
          WebkitBoxSizing: "border-box",
          background: 'url("img/background-image-golden2.png") repeat repeat',
          backgroundClip: "padding-box",
          backgroundOrigin: "padding-box",
          backgroundPosition: "center"
        },
        ".rpgui-container.framed-grey": {
          position: "relative",
          borderStyle: "solid",
          borderImageSource: 'url("img/border-image-grey.png")',
          borderImageRepeat: "repeat",
          borderImageSlice: "3 3 3 3",
          borderImageWidth: "7px",
          borderWidth: "7px",
          padding: "12px",
          boxSizing: "border-box",
          MozBoxSizing: "border-box",
          WebkitBoxSizing: "border-box",
          background: 'url("img/background-image-grey.png") repeat repeat',
          backgroundClip: "padding-box",
          backgroundOrigin: "padding-box",
          backgroundPosition: "center"
        },
        ".rpgui-cursor-default": {
          cursor: 'url("img/cursor/default.png"), auto !important'
        },
        ".rpgui-content,\nlabel": { cursor: 'url("img/cursor/default.png"), auto' },
        ".rpgui-cursor-point,\n.rpgui-cursor-point *": {
          cursor: 'url("img/cursor/point.png") 10 0, auto !important'
        },
        ".rpgui-content a,\n.rpgui-content button,\n.rpgui-button,\n.rpgui-slider-container,\n.rpgui-content input[type=radio].rpgui-radio + label,\n.rpgui-list-imp,\n.rpgui-dropdown-imp,\n.rpgui-content input[type=checkbox].rpgui-checkbox + label": {
          cursor: 'url("img/cursor/point.png") 10 0, auto'
        },
        ".rpgui-cursor-select,\n.rpgui-cursor-select *": {
          cursor: 'url("img/cursor/select.png") 10 0, auto !important'
        },
        ".rpgui-cursor-select,\n.rpgui-content input,\n.rpgui-content textarea": {
          cursor: 'url("img/cursor/select.png") 10 0, auto'
        },
        ".rpgui-cursor-grab-open,\n.rpgui-cursor-grab-open *": {
          cursor: 'url("img/cursor/grab-open.png") 10 0, auto !important'
        },
        ".rpgui-cursor-grab-close,\n.rpgui-cursor-grab-close *": {
          cursor: 'url("img/cursor/grab-close.png") 10 0, auto !important'
        },
        ".rpgui-dropdown-imp,\n.rpgui-dropdown": {
          textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black",
          color: "white",
          minHeight: "40px",
          marginTop: "0px",
          borderStyle: "solid",
          borderWidth: "7px 7px 7px 7px",
          MozBorderImage: 'url("img/select-border-image.png") 10% repeat repeat',
          WebkitBorderImage: 'url("img/select-border-image.png") 10% repeat repeat',
          OBorderImage: 'url("img/select-border-image.png") 10% repeat repeat',
          borderImage: 'url("img/select-border-image.png") 10% repeat repeat',
          background: 'url("img/select-background-image.png") repeat repeat',
          backgroundClip: "padding-box",
          backgroundOrigin: "padding-box",
          backgroundPosition: "center"
        },
        "ul.rpgui-dropdown-imp": { padding: "0 0 0 0 !important", zIndex: 100 },
        ".rpgui-content .rpgui-dropdown-imp-header": {
          color: "white !important",
          minHeight: "22px !important",
          padding: "5px 10px 0 10px !important",
          margin: "0 0 0 0 !important",
          position: "relative !important"
        },
        ".rpgui-dropdown-imp li": {
          textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black",
          color: "white",
          height: "16px",
          listStyleType: "none",
          paddingTop: "6px",
          paddingBottom: "6px",
          paddingLeft: "6px",
          background: 'url("img/select-background-image.png") repeat repeat',
          backgroundClip: "padding-box",
          backgroundOrigin: "padding-box",
          backgroundPosition: "center"
        },
        ".rpgui-dropdown-imp li:hover": { color: "yellow" },
        ".rpgui-dropdown-imp:hover": { color: "yellow" },
        ".rpgui-content hr": {
          display: "block",
          border: "0px",
          height: "10px",
          background: 'url("img/hr.png") repeat-x top left'
        },
        ".rpgui-content hr.golden": {
          display: "block",
          border: "0px",
          height: "10px",
          background: 'url("img/hr-golden.png") no-repeat top left',
          backgroundSize: "100% 100%"
        },
        ".rpgui-icon": {
          display: "inline-block",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          width: "64px",
          height: "64px"
        },
        ".rpgui-icon.sword": { backgroundImage: 'url("img/icons/sword.png")' },
        ".rpgui-icon.shield": { backgroundImage: 'url("img/icons/shield.png")' },
        ".rpgui-icon.exclamation": {
          backgroundImage: 'url("img/icons/exclamation.png")'
        },
        ".rpgui-icon.potion-red": {
          backgroundImage: 'url("img/icons/potion-red.png")'
        },
        ".rpgui-icon.potion-green": {
          backgroundImage: 'url("img/icons/potion-green.png")'
        },
        ".rpgui-icon.potion-blue": {
          backgroundImage: 'url("img/icons/potion-blue.png")'
        },
        ".rpgui-icon.weapon-slot": {
          backgroundImage: 'url("img/icons/weapon-slot.png")'
        },
        ".rpgui-icon.shield-slot": {
          backgroundImage: 'url("img/icons/shield-slot.png")'
        },
        ".rpgui-icon.armor-slot": {
          backgroundImage: 'url("img/icons/armor-slot.png")'
        },
        ".rpgui-icon.helmet-slot": {
          backgroundImage: 'url("img/icons/helmet-slot.png")'
        },
        ".rpgui-icon.ring-slot": {
          backgroundImage: 'url("img/icons/ring-slot.png")'
        },
        ".rpgui-icon.potion-slot": {
          backgroundImage: 'url("img/icons/potion-slot.png")'
        },
        ".rpgui-icon.magic-slot": {
          backgroundImage: 'url("img/icons/magic-slot.png")'
        },
        ".rpgui-icon.shoes-slot": {
          backgroundImage: 'url("img/icons/shoes-slot.png")'
        },
        ".rpgui-icon.empty-slot": {
          backgroundImage: 'url("img/icons/empty-slot.png")'
        },
        ".rpgui-content input,\n.rpgui-content textarea": {
          WebkitBoxSizing: "border-box",
          MozBoxSizing: "border-box",
          boxSizing: "border-box",
          color: "white",
          textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black",
          fontSize: "0.9em",
          lineHeight: "32px",
          background: "#4e4a4e",
          maxWidth: "100%",
          width: "100%",
          paddingLeft: "10px",
          minHeight: "30px",
          WebkitTouchCallout: "text",
          WebkitUserSelect: "text",
          KhtmlUserSelect: "text",
          MozUserSelect: "text",
          msUserSelect: "text",
          userSelect: "text",
          WebkitTapHighlightColor: "rgba(0, 0, 0, 0.5)"
        },
        ".rpgui-content textarea": {
          lineHeight: "22px",
          paddingTop: "7px",
          height: "80px",
          resize: "none"
        },
        ".rpgui-content input::selection,\n.rpgui-content textarea::selection": {
          background: "rgba(0, 0, 0, 0.5)"
        },
        ".rpgui-content input::-moz-selection,\n.rpgui-content textarea::-moz-selection": {
          background: "rgba(0, 0, 0, 0.5)"
        },
        ".rpgui-list-imp": {
          textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black",
          color: "white",
          minHeight: "40px",
          marginTop: "0px",
          overflowX: "hidden",
          overflowY: "scroll",
          borderStyle: "solid",
          borderWidth: "7px 7px 7px 7px",
          MozBorderImage: 'url("img/select-border-image.png") 10% repeat repeat',
          WebkitBorderImage: 'url("img/select-border-image.png") 10% repeat repeat',
          OBorderImage: 'url("img/select-border-image.png") 10% repeat repeat',
          borderImage: 'url("img/select-border-image.png") 10% repeat repeat',
          background: 'url("img/select-background-image.png") repeat repeat',
          backgroundClip: "padding-box",
          backgroundOrigin: "padding-box",
          backgroundPosition: "center"
        },
        "ul.rpgui-list-imp": { padding: "0 0 0 0 !important", zIndex: 100 },
        ".rpgui-list-imp li": {
          textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black",
          color: "white",
          height: "16px",
          marginLeft: "5px !important",
          listStyleType: "none",
          paddingTop: "6px",
          paddingBottom: "6px",
          paddingLeft: "6px",
          background: 'url("img/select-background-image.png") repeat repeat',
          backgroundClip: "padding-box",
          backgroundOrigin: "padding-box",
          backgroundPosition: "center"
        },
        ".rpgui-list-imp li:hover": { color: "yellow" },
        ".rpgui-list-imp:hover": { color: "yellow" },
        ".rpgui-list-imp .rpgui-selected": { background: "rgba(0, 0, 0, 0.3)" },
        ".rpgui-content h1": {
          color: "white",
          textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black",
          fontSize: "1.14em",
          textAlign: "center",
          padding: "0 0 0 0",
          margin: "7px 7px 17px 7px"
        },
        ".rpgui-content h2": {
          color: "white",
          textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black",
          fontSize: "1.25em",
          textAlign: "center",
          padding: "0 0 0 0",
          margin: "7px 7px 17px 7px"
        },
        ".rpgui-content h3": {
          color: "white",
          fontWeight: 1,
          textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black",
          fontSize: "1.15em",
          textDecoration: "underline",
          textAlign: "center",
          padding: "0 0 0 0",
          margin: "7px 7px 17px 7px"
        },
        ".rpgui-content h4": {
          color: "white",
          fontWeight: 1,
          textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black",
          fontSize: "1.0em",
          textDecoration: "underline",
          textAlign: "center",
          padding: "0 0 0 0",
          margin: "7px 7px 17px 7px"
        },
        ".rpgui-content p": {
          color: "white",
          textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black",
          fontSize: "1.0em",
          lineHeight: "22px"
        },
        ".rpgui-content span": {
          color: "white",
          textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black",
          fontSize: "1.0em",
          lineHeight: "22px"
        },
        ".rpgui-content a": {
          color: "yellow",
          textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black",
          fontSize: "1.0em",
          lineHeight: "22px",
          textDecoration: "none"
        },
        ".rpgui-content a:hover": { textDecoration: "underline" },
        ".rpgui-content label": {
          color: "white",
          textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black",
          fontSize: "1.0em",
          lineHeight: "20px",
          display: "inline"
        },
        ".rpgui-content li": {
          marginLeft: "20px",
          color: "white",
          textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black",
          fontSize: "1.0em",
          lineHeight: "22px"
        },
        ".rpgui-progress": {
          height: "42px",
          width: "100%",
          marginTop: "5px",
          marginBottom: "5px",
          position: "relative"
        },
        ".rpgui-progress-left-edge": {
          position: "absolute",
          height: "42px",
          width: "40px",
          left: "0px",
          backgroundImage: 'url("img/progress-bar-left.png")',
          backgroundSize: "100% 100%"
        },
        ".rpgui-progress-right-edge": {
          position: "absolute",
          height: "42px",
          width: "40px",
          right: "0px",
          backgroundImage: 'url("img/progress-bar-right.png")',
          backgroundSize: "100% 100%"
        },
        ".rpgui-progress-track": {
          position: "absolute",
          height: "42px",
          left: "40px",
          right: "40px",
          backgroundImage: 'url("img/progress-bar-track.png")',
          backgroundRepeat: "repeat-x",
          backgroundSize: "36px 100%"
        },
        ".rpgui-progress-fill": {
          position: "absolute",
          top: "9px",
          bottom: "8px",
          left: "0",
          width: "100%",
          backgroundImage: 'url("img/progress.png")',
          backgroundRepeat: "repeat-x",
          backgroundSize: "36px 100%"
        },
        ".rpgui-progress-fill.blue": {
          backgroundImage: 'url("img/progress-blue.png")'
        },
        ".rpgui-progress-fill.green": {
          backgroundImage: 'url("img/progress-green.png")'
        },
        ".rpgui-progress-fill.red": {
          backgroundImage: 'url("img/progress-red.png")'
        },
        ".rpgui-content input[type=radio].rpgui-radio": { display: "none" },
        ".rpgui-content input[type=radio].rpgui-radio + label": {
          background: 'url("img/radio-off.png") no-repeat',
          lineHeight: "24px",
          display: "inline-block",
          backgroundSize: "auto 100%",
          paddingLeft: "34px",
          height: "24px",
          marginTop: "8px",
          marginBottom: "8px"
        },
        ".rpgui-content input[type=radio].rpgui-radio:checked + label": {
          background: 'url("img/radio-on.png") no-repeat',
          lineHeight: "24px",
          display: "inline-block",
          backgroundSize: "auto 100%",
          paddingLeft: "34px",
          height: "24px"
        },
        ".rpgui-content .rpgui-radio.golden + label": {
          background: 'url("img/radio-golden-off.png") no-repeat !important',
          backgroundSize: "auto 100% !important"
        },
        ".rpgui-content .rpgui-radio.golden:checked + label": {
          background: 'url("img/radio-golden-on.png") no-repeat !important',
          backgroundSize: "auto 100% !important"
        },
        ".rpgui-content ::-webkit-scrollbar,\n.rpgui-content::-webkit-scrollbar": {
          width: "18px"
        },
        ".rpgui-content ::-webkit-scrollbar-track,\n.rpgui-content::-webkit-scrollbar-track": {
          backgroundImage: 'url("img/scrollbar-track.png")',
          backgroundSize: "18px 60px",
          backgroundRepeat: "repeat-y"
        },
        ".rpgui-content ::-webkit-scrollbar-thumb,\n.rpgui-content::-webkit-scrollbar-thumb": {
          backgroundImage: 'url("img/scrollbar-thumb.png")',
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat"
        },
        ".rpgui-content ::-webkit-scrollbar-button,\n.rpgui-content::-webkit-scrollbar-button": {
          backgroundImage: 'url("img/scrollbar-button.png")',
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat"
        },
        ".rpgui-disabled,\n.rpgui-content :disabled,\n.rpgui-content input[type=radio]:disabled + label,\n.rpgui-content input[type=checkbox]:disabled + label,\n.rpgui-content input[type=range]:disabled + .rpgui-slider-container,\n.rpgui-content :disabled + .rpgui-dropdown-imp,\n.rpgui-content :disabled + .rpgui-dropdown-imp + .rpgui-dropdown-imp,\n.rpgui-content :disabled + .rpgui-list-imp": {
          cursor: 'url("img/cursor/default.png"), auto',
          WebkitFilter: ["grayscale(1)", "grayscale(100%)"],
          filter: [
            "grayscale(100%)",
            "url(#greyscale)",
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><filter id='grayscale'><feColorMatrix type='matrix' values='0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0'/></filter></svg>#grayscale\")",
            "gray"
          ],
          color: "#999"
        },
        ".rpgui-slider-container": {
          height: "20px",
          width: "100%",
          marginTop: "15px",
          marginBottom: "15px",
          position: "relative"
        },
        ".rpgui-slider-left-edge": {
          position: "absolute",
          height: "20px",
          width: "20px",
          left: "0px",
          backgroundImage: 'url("img/slider-left.png")',
          backgroundSize: "100% 100%"
        },
        ".rpgui-slider-right-edge": {
          position: "absolute",
          height: "20px",
          width: "20px",
          right: "0px",
          backgroundImage: 'url("img/slider-right.png")',
          backgroundSize: "100% 100%"
        },
        ".rpgui-slider-track": {
          position: "absolute",
          height: "20px",
          left: "0",
          right: "0",
          backgroundImage: 'url("img/slider-track.png")',
          backgroundRepeat: "repeat-x",
          backgroundSize: "24px 100%"
        },
        ".rpgui-slider-thumb": {
          position: "absolute",
          height: "30px",
          width: "15px",
          marginTop: "-5px",
          left: "40px",
          backgroundImage: 'url("img/slider-thumb.png")',
          backgroundSize: "100% 100%"
        },
        ".rpgui-slider-container.golden": {
          height: "30px",
          width: "100%",
          marginTop: "15px",
          marginBottom: "15px",
          position: "relative"
        },
        ".rpgui-slider-left-edge.golden": {
          position: "absolute",
          height: "30px",
          width: "30px",
          left: "0px",
          backgroundImage: 'url("img/slider-left-golden.png")',
          backgroundSize: "100% 100%"
        },
        ".rpgui-slider-right-edge.golden": {
          position: "absolute",
          height: "30px",
          width: "30px",
          right: "0px",
          backgroundImage: 'url("img/slider-right-golden.png")',
          backgroundSize: "100% 100%"
        },
        ".rpgui-slider-track.golden": {
          position: "absolute",
          height: "30px",
          left: "0",
          right: "0",
          backgroundImage: 'url("img/slider-track-golden.png")',
          backgroundRepeat: "repeat-x",
          backgroundSize: "40px 100%"
        },
        ".rpgui-slider-thumb.golden": {
          position: "absolute",
          height: "36px",
          width: "18px",
          marginTop: "-4px",
          left: "40px",
          backgroundImage: 'url("img/slider-thumb-golden.png")',
          backgroundSize: "100% 100%"
        }
      })
    })*/
  ],
}
