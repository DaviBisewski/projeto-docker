# Projeto Docker — Sistemas Operacionais

**Aluno:** Davi Bisewski

---

## 1. Qual a diferença entre imagem e container?

A imagem é um modelo estático e somente leitura que contém tudo que a aplicação precisa para rodar: sistema de arquivos, dependências e código. O container é uma instância em execução dessa imagem — é a imagem "viva", rodando como um processo isolado no sistema operacional. Uma mesma imagem pode gerar vários containers simultaneamente.

## 2. Qual processo está executando dentro do container?

O processo principal é o Node.js executando o arquivo `server.js`. Ele roda com PID 1 dentro do container, pois é o primeiro e único processo iniciado no namespace de processos daquele container.

## 3. O container possui kernel próprio? Justifique.

Não. O container compartilha o kernel do sistema operacional hospedeiro (host). Diferente de uma máquina virtual, o Docker utiliza recursos de isolamento do próprio kernel Linux — namespaces e cgroups — para separar os processos, sem precisar instalar ou manter um kernel próprio por container.

## 4. Qual recurso foi limitado na sua infraestrutura?

A memória RAM foi limitada. Ambos os containers foram configurados com `mem_limit: 128m`, ou seja, o sistema operacional (via Docker) impede que cada um use mais de 128 MB de memória. Isso demonstra o conceito de gerenciamento de recursos do SO, onde o kernel controla e distribui os recursos disponíveis entre os processos.

## 5. Qual a finalidade do volume Docker utilizado?

O volume `volume-so` foi criado para persistir os dados do banco de dados MySQL. Sem ele, ao remover ou reiniciar o container, todos os dados armazenados seriam perdidos. O volume mantém os dados salvos no host, independente do ciclo de vida do container, garantindo durabilidade das informações.

## 6. Qual a finalidade da rede Docker criada?

A rede `rede-so` permite que os containers `app-so` e `db-so` se comuniquem entre si pelo nome (o Node.js acessa o MySQL pelo hostname `db`), de forma isolada. Nenhum container externo consegue acessar essa rede sem ser explicitamente adicionado a ela, o que aumenta a segurança da infraestrutura.

## 7. Por que executar aplicações como usuário não-root?

Por segurança. Se um atacante explorar uma vulnerabilidade na aplicação, ele terá apenas os privilégios do usuário `appuser`, sem acesso administrativo ao sistema. Rodar como root dentro do container seria um risco, pois em caso de falha de isolamento o invasor teria controle total sobre o host.

## 8. Por que Docker não é uma máquina virtual?

Porque o Docker não emula hardware nem possui um sistema operacional completo por container. Ele utiliza o kernel do host e isola processos usando namespaces e cgroups do próprio Linux. Máquinas virtuais possuem kernel próprio, boot completo e consomem muito mais recursos. Containers são mais leves, iniciam em segundos e compartilham o mesmo kernel do sistema hospedeiro.

## 9. O que representa o PID exibido na rota /info?

O PID (Process ID) é o identificador do processo Node.js dentro do container. Ele aparece como `1` porque dentro do namespace de processos do container, o Node.js é o processo inicial — equivalente ao `init` em um sistema Linux tradicional. Fora do container, no host, esse mesmo processo possui um PID diferente.

## 10. Cite três conceitos de Sistemas Operacionais presentes neste projeto.

- **Processos:** cada container executa um processo isolado com seu próprio namespace de PID. O Node.js roda com PID 1 dentro do container `app-so`, demonstrando o gerenciamento de processos pelo SO.
- **Gerenciamento de recursos:** o limite de memória (`mem_limit: 128m`) demonstra como o SO controla e distribui recursos entre processos, impedindo que um container consuma memória além do permitido.
- **Virtualização:** o Docker utiliza virtualização em nível de sistema operacional (containers) para isolar ambientes, compartilhando o mesmo kernel do host. Isso é diferente da virtualização de hardware das VMs, sendo mais eficiente em uso de recursos.