
import cssParser, { findAndReplaceUnits } from 'css-math/lib/parser';
import parser  from './index';
import wrapper from '../../wrapper';
import styleHelper, { getClassName } from './styleHelper';
import { defaultTableAttributes } from '../../../helpers/style';
import attributesToString, { mapAttributesToString } from '../../../helpers/attributesToString';

const applyOuter = (innerHtml, rowAttributes, classes, widthAttributes) => {
  const {
    backgroundColor,
    backgroundImage,
    contentWidth,
    fullWidth,
  } = rowAttributes;

  let tableAttrs = {
    align: 'center',
    backgroundColor: backgroundColor,
    style: {
      margin: 'auto',
    },
  };

  if (fullWidth) {
    tableAttrs.width = '100%';

    tableAttrs = defaultTableAttributes(tableAttrs);
  } else {
    tableAttrs = Object.assign({}, defaultTableAttributes(tableAttrs), {
      width: contentWidth,
      className: classes.join(' '),
      style: widthAttributes,
    });
  }

  const attributes = mapAttributesToString({
    table: tableAttrs,
    td: {
      background: backgroundImage,
      backgroundColor: backgroundColor,
      valign: 'top',
      align: 'center',
    },
    vRect: {
      fill: true,
      stroked: false,
      style: {
        width: (fullWidth ? undefined : contentWidth),
        msoWidthPercent: (fullWidth ? 1000 : undefined)
      }
    },
    vFill: {
      type: 'tile',
      src: backgroundImage,
      color: backgroundColor,
    },
    vTextbox: {
      inset: '0px, 0px, 0px, 0px',
      style: {
        msoFitShapeToText: true,
        padding: 0,
      }
    },
  });

  return `<table ${attributes.table}>
              <tr>
                <td ${attributes.td}>
                  ${innerHtml}
                </td>
              </tr>
            </table>`;

  /**
   * @todo Allow the use of background images. The below code doesn't work correctly on Outlook 2016
   * due to margins above and below the content and also left align elements.
   */
  return `<table ${attributes.table}>
              <tr>
                <td ${attributes.td}>
                  <!--[if gte mso 9]>
                    <v:rect xmlns:v="urn:schemas-microsoft-com:vml" ${attributes.vRect}>
                    <v:fill ${attributes.vFill} />
                    <v:textbox ${attributes.vTextbox}>
                    <center>
                  <![endif]-->
                  <div>
                  ${innerHtml}
                  </div>
                  <!--[if gte mso 9]>
                    </center>
                    </v:textbox>
                    </v:rect>
                  <![endif]-->
                </td>
              </tr>
            </table>`;
};

const applyBorder = (innerHtml, contentWidth, spacing, spacingWidth, spacingColor, widthAttributes) => {
  if (['outside', 'both'].indexOf(spacing) === -1) {
    return innerHtml;
  }

  const spacingWidthValue = findAndReplaceUnits(spacingWidth).value;
  const contentWidthValue = findAndReplaceUnits(contentWidth).value;

  const attributes = {
    table: attributesToString({
      align: 'center',
      width: contentWidthValue,
      cellpadding: '0',
      cellspacing: '0',
      'class': 'layout-border',
      style: Object.assign({}, {
        borderCollapse: 'collapse',
        margin: '0px',
        msoPaddingAlt: '0px',
        padding: '0px',
      }, widthAttributes),
    }),
    td: attributesToString({
      valign: 'top',
      bgcolor: spacingColor,
      width: spacingWidthValue,
      style: {
        width: spacingWidth,
      },
    }),
    tableInner: attributesToString({
      width: spacingWidthValue,
      cellpadding: '0',
      cellspacing: '0',
    }),
    tdInner: attributesToString({
      width: spacingWidthValue,
    }),
    img: attributesToString({
      width: spacingWidthValue,
      height: spacingWidthValue,
      src: 'https://www.mizmoz.com/img/spacer.gif',
    })
  };

  return `<table ${attributes.table}>
        <tr>
          <td ${attributes.td}>
            <table ${attributes.tableInner}>
              <tr>
                <td ${attributes.tdInner}>
                  <img ${attributes.img} />
                </td>
              </tr>
            </table>
          </td>
          <td>
            ${innerHtml}
          </td>
          <td ${attributes.td}>
            <table ${attributes.tableInner}>
              <tr>
                <td ${attributes.tdInner}>
                  <img ${attributes.img} />
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>`;
};

/**
 * Apply the inside borders
 *
 */
const applyInsideBorder = (innerHtml, key, spacing, spacingWidth, spacingColor, mobileWidth, mobileBreakpoint) => {
  if (['inside', 'both'].indexOf(spacing) === -1 || key === 0) {
    // no inside borders / spacing
    return innerHtml;
  }

  const spacingWidthValue = findAndReplaceUnits(spacingWidth).value;
  const calcWidth = calc(spacingWidth, mobileWidth, mobileBreakpoint);

  const attributes = {
    td: attributesToString({
      'class': 'column',
      valign: 'top',
      bgcolor: spacingColor,
      width: spacingWidthValue,
      style: {
        width: spacingWidth,
      },
    }),
    div: attributesToString({
      'class': `column simple-${spacingWidthValue}`,
      style: {
        margin: 'auto',
        background: spacingColor,
        height: spacingWidth,
        lineHeight: spacingWidth,
        maxWidth: mobileWidth,
        minWidth: spacingWidth,
        width: [
          '100%',
          calcWidth,
        ],
      },
    }),
  };

  return `<td ${attributes.td}>
      <![endif]-->
			<div ${attributes.div}>&nbsp;</div>
      <!--[if (mso)|(IE)]>
      </td>
      ${innerHtml}
`;
};

/**
 * Create the calc width
 *
 * @param desktopWidth
 * @param mobileWidth
 * @param mobileBreakpoint
 * @return string
 */
const calc = (desktopWidth, mobileWidth, mobileBreakpoint) => {
  if (desktopWidth > mobileWidth) {
    const a = cssParser(`(${desktopWidth} - ${mobileWidth}) * 100`).replace('px', '%');
    const b = cssParser(`(${desktopWidth} - ${mobileWidth}) * ${mobileBreakpoint} - ${desktopWidth}`);
    return `calc(${a} - ${b})`;
  }

  const a = cssParser(`((${mobileWidth} - ${desktopWidth}) * (${mobileBreakpoint} - 1) + ${mobileWidth})`);
  const b = cssParser(`(${mobileWidth} - ${desktopWidth}) * 100`).replace('px', '%');
  return `calc(${a} - ${b})`;
};

/**
 * Get the calculated attributes like calc()
 *
 * @return {*}
 */
export const getCalculatedAttributes = (attributes) => {
  // create the calc widths
  const calcWidth = calc(
    attributes.contentWidth,
    attributes.mobileWidth,
    attributes.mobileBreakpoint
  );

  return Object.assign({}, attributes, {
    calcWidth: calcWidth,
  });
};

/**
 * Render the row
 * <mmm-row
 *  width="100%"
 *  content-width="600px"
 * >...</row>
 *
 * @param attributes
 * @return
 */
export const render = (attributes, { template, dom }) => {
  const {
    backgroundColor,
    calcWidth,
    children,
    contentWidth,
    contentInnerWidth,
    maxWidth,
    mobileBreakpoint,
    mobileWidth,
    mobileSpaceWidth,
    minWidth,
    spacing,
    spacingWidth,
    spacingColor,
  } = getCalculatedAttributes(attributes);

  const { getElementAttribute } = dom;
  const className = getClassName(contentWidth);
  const classNameInner = getClassName(contentInnerWidth);

  const styleWidths = [
    contentWidth,
    contentInnerWidth,
  ];

  // get the min width of the table
  const widthAttributes = {
    maxWidth: maxWidth,
    minWidth: minWidth,
    width: [
      mobileWidth,
      calcWidth,
    ],
  };
  const tableInnerWidth = findAndReplaceUnits(contentInnerWidth).value;

  const innerHtml = children.map((child, key) => {
    const styleWidth = findAndReplaceUnits(getElementAttribute(child, 'width')).value;
    const background = getElementAttribute(child, 'background', 'transparent');

    // add the width so we can add classes later
    styleWidths.push(getElementAttribute(child, 'width'));

    const tdAttributes = attributesToString({
      'class': 'column',
      valign: 'top',
      width: styleWidth,
      bgcolor: background
    });

    return applyInsideBorder(`<td ${tdAttributes}>
            <![endif]-->
              {{children.${child.childrenPosition}}}
            <!--[if (mso)|(IE)]>
            </td>`, key, spacing, spacingWidth, spacingColor, mobileSpaceWidth, mobileBreakpoint);
  });

  const tableAttributes = attributesToString({
    'class': classNameInner,
    align: 'center',
    cellpadding: '0',
    cellspacing: '0',
    bgcolor: backgroundColor,
    width:tableInnerWidth,
  });

  const innerContent = applyBorder(`<!--[if (mso)|(IE)]>
        <table ${tableAttributes}>
          <tr>
            ${innerHtml.join('')}
          </tr>
        </table>
      <![endif]-->`, contentWidth, spacing, spacingWidth, spacingColor, widthAttributes);

  // add the style widths to the stylesheet
  template.getStyles().addHelper('mmm-row', styleHelper(mobileBreakpoint), [contentWidth]);

  const classes = [
    className,
  ];

  if (typeof attributes.class === 'string') {
    classes.push(attributes.class);
  }

  const divAttributes = attributesToString({
    'class': classes.join(' '),
    style: Object.assign({}, {
      backgroundColor: backgroundColor,
      display: 'table',
      margin: '0 auto',
    }, widthAttributes),
  });

  return applyOuter(`<div ${divAttributes}>
      ${innerContent}
    </div>`, attributes, classes, widthAttributes);
};

export default wrapper(parser, render);
