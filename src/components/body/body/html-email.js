
import parser from './index';
import wrapper from '../../wrapper';

export const render = (attributes) => {
  const className = attributes.class;
  const { backgroundColor, margin, padding } = attributes;
  const style = `background-color: ${backgroundColor}; margin: ${margin}; padding: ${padding};`;

  return `<body class="${className}" bgcolor="${backgroundColor}" style="${style}">
  <div style="background-color: ${backgroundColor}">
    <!--[if gte mso 9]>
    <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
      <v:fill type="tile" src="" color="${backgroundColor}"/>
    </v:background>
    <![endif]-->
    <table height="100%" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr>
        <td valign="top" align="left">
          {{children}}
        </td>
      </tr>
    </table>
  </div>
</body>`;
};

/**
 * Parse the html tag
 *
 * @param result
 * @return string
 */
export default wrapper(parser, render);
