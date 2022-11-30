document.write('<div class="conteiner">');
for(i=1; i<=10; i++){
    document.write('<table border="1"> <tr> <td colspan="2"> <strong> Produtos de ' + i + '</strong> </td> </tr>');
    for(j=1; j<=10; j++){
        multi = i*j;
        document.write('<tr class="linha">' + '<td>' + i + 'x' + j + '</td>' + '<td>' + multi + '</td>' + '</tr>');
    }
    document.write('</table>');
}
document.write('</div>');